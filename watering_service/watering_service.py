#!/usr/bin/env python3
# Python Modules
from os import environ
from time import time

# Installed Libraries
from cloudant.client import CouchDB
from cloudant.query import Query
import paho.mqtt.publish as mqtt


def main():
    """Watering Service."""
    # Connect to DB
    dbclient = dbclient = CouchDB(environ.get("COUCHDB_USER"),
                                  environ.get("COUCHDB_PASSWORD"),
                                  url='http://db:5984',
                                  connect=True)
    plantdb = dbclient['plant_device']
    readingdb = dbclient['plant_device_reading']

    # Check all plants
    for doc in plantdb:
        device_id = doc['_id']
        print(device_id)
        if 'wateringConditionTrigger' in doc:
            trigger = doc['wateringConditionTrigger']
            check_value = doc['wateringConditionValue']

            # Check for watering based on trigger
            if trigger == "moisture":
                check_moisture(readingdb, device_id, check_value)
            elif trigger == 'time':
                check_time(readingdb, device_id, check_value)

    dbclient.disconnect()


def check_moisture(readingdb, deviceid, check_value):
    """Check moisture level of device against watering value. Water if necessary.

    Args:
        readingdb (obj): Reading Database Object
        deviceid (str): device id
        check_value ([type]): [description]
    """
    print("Checking Moisture")

    # Query DB
    query = Query(readingdb, selector={'device_id': {'$eq': deviceid}, 'type': {'$eq': 'moisture'}})
    result = query(sort=[{'time_reading': 'desc'}], limit=1)['docs']

    # Process reading
    if len(result) > 0:
        result = result[0]
        print("Readging:", result)
        if float(result['values']['moisture_level']) <= float(check_value):
            water_plant(deviceid)


def check_time(readingdb, deviceid, check_value):
    """Check last watered time against value. Water if necessary.

    Args:
        readingdb (obj): Reading database object
        deviceid (str): Device Id
        check_value (int): Days to wait between watering
    """
    print("Checking Time")

    # Query DB
    query = Query(readingdb, selector={'device_id': {'$eq': deviceid}, 'type': {'$eq': 'pump'}})
    result = query(sort=[{'time_reading': 'desc'}], limit=1)['docs']

    # Process reading
    if len(result) > 0:
        result = result[0]
        days = check_value * 86400
        if result['time_reading'] <= int(time()) - days:
            water_plant(deviceid)
    else:
        # Pump has not been watered ever
        # Water so there is a history
        print("Watering for the first time")
        water_plant(deviceid)


def water_plant(deviceid):
    """Water plant by messaging MQTT broker.

    Args:
        deviceid (str): Device ID
    """
    topic = "perennial/" + deviceid + "/pump"

    # Send water message to broker
    mqtt.single(topic, payload="pump", hostname=environ.get("MQTT_BROKER"))
    print("Plant watered")


if __name__ == "__main__":
    main()
