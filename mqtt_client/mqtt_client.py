"""Connect to mqtt client and import readings."""
import paho.mqtt.client as mqtt
from cloudant.client import CouchDB
from time import time
from os import environ


def on_connect(client, userdata, flags, rc):
    """Call when the client receives a CONNACK response from server.

    Args:
        client ([type]): [description]
        userdata ([type]): [description]
        flags ([type]): [description]
        rc ([type]): [description]
    """
    print("Connected with result code" + str(rc))

    client.subscribe("perennial/#")
    # client.subscribe("$SYS/#", 1)


def on_message(client, userdata, msg):
    """Call when a PUBLISH message is received from the server.

    Args:
        client ([type]): [description]
        userdata ([type]): [description]
        msg ([type]): [description]
    """
    try:
        reading = {}
        values = {}

        payload = str(msg.payload.decode("utf-8"))
        splittopic = msg.topic.split("/")
        deviceID = splittopic[1]
        topic = splittopic[2]

        # Set values. Return if it isn't the right topic to put in DB
        if topic == "moisture":
            values["moisture_level"] = payload
        elif topic == "availability":
            values["device_availability"] = payload
        else:
            return

        reading["type"] = topic
        reading["device_id"] = str(deviceID)
        reading["time_reading"] = int(time())
        reading["values"] = values

        print(reading)

    except Exception as e:
        print("Error processing message: " + str(e))

    # Connect to DB
    try:
        dbclient = CouchDB(environ.get("COUCHDB_USER"), environ.get("COUCHDB_PASSWORD"), url='http://db:5984', connect=True)
        db = dbclient['plant_device_reading']
        document = db.create_document(reading)
        if document.exists():
            print("Added to DB.")
        dbclient.disconnect()

    except Exception as e:
        print("Error Writing to DB" + str(e))


def main():
    """Client."""
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(environ.get("MQTT_BROKER"), 1883, 60)
    client.loop_forever()


if __name__ == "__main__":
    main()
