#!/usr/bin/env python3
"""Watering Service.

Checks plants to see if they need to be watered. Waters if necessary. Alerts user depending on settings.
Built to be run by cron.
"""
# Python Modules
from os import environ
from time import time


# Installed Libraries
from cloudant.client import CouchDB
from cloudant.query import Query
import paho.mqtt.publish as mqtt
import requests

dbclient = dbclient = CouchDB(environ.get("COUCHDB_USER"),
                              environ.get("COUCHDB_PASSWORD"),
                              url='http://db:5984',
                              connect=True)
plantdb = dbclient['plant_device']
readingdb = dbclient['plant_device_reading']
usersdb = dbclient['users']


def main():
    """Watering Service."""
    # Connect to DB

    # Check all plants
    for doc in plantdb:
        device_id = doc['_id']
        print(device_id)
        if 'wateringConditionTrigger' in doc:
            username = doc['username']
            trigger = doc['wateringConditionTrigger']
            check_value = doc['wateringConditionValue']
            device_name = doc['name']

            # Check for watering based on trigger
            if trigger == "moisture":
                check_moisture(device_id, check_value, username, device_name)
            elif trigger == 'time':
                check_time(device_id, check_value, username, device_name)


def check_moisture(deviceid, check_value, username, device_name):
    """Check moisture level of device against watering value. Water if necessary.

    Args:
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
            water_plant(deviceid, username, device_name)


def check_time(deviceid, check_value, username, device_name):
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
            water_plant(deviceid, username, device_name)
    else:
        # Pump has not been watered ever
        # Water so there is a history
        print("Watering for the first time")
        water_plant(deviceid, username, device_name)


def water_plant(deviceid, username, device_name):
    """Water plant by messaging MQTT broker.

    Args:
        deviceid (str): Device ID
    """
    topic = "perennial/" + deviceid + "/pump"

    # Send water message to broker
    mqtt.single(topic, payload="pump", hostname=environ.get("MQTT_BROKER"))
    print("Plant watered")

    # Alert User
    if username in usersdb:
        user_doc = usersdb[username]

        if "notificationMethod" in user_doc and 'wateredPlant' in user_doc['notificationTriggers']:
            notification_method = user_doc['notificationMethod']
            if notification_method == "email":
                print("Sending notification by email.")
                payload = {
                    'subject': device_name + ' has just been watered!',
                    'receiver': user_doc['email'],
                    'message': 'Hello ' + username + '! \n\nYour device, ' + device_name + ', was just watered!\n\nThank you for using Project Perennial.\n\n'
                }
                print("Payload:", payload)
                r = requests.post("http://djangobackend:8000/notifications/email/", data=payload)
                if r.status_code == 200:
                    print("Sent notification by email.")
                else:
                    print("Email sending failed.")

            elif notification_method == "sms":
                print("Sending notification by sms")
                payload = {
                    "phonenumber": user_doc['phoneNum'],
                    "message": device_name + " was just watered!"
                }
                print("Payload:", payload)
                r = requests.post("http://djangobackend:8000/notifications/sms/", data=payload)
                if r.status_code == 200:
                    print("Sent notification by sms.")
                else:
                    print("SMS sending failed.")


if __name__ == "__main__":
    main()
    dbclient.disconnect()
