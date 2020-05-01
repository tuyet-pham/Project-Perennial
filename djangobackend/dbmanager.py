'''
 Use CouchDB to create a CouchDB client
 This is an independent manager for the database
 This is to hopefully consolidate the access to the db

 Documentations for couchdb and python connection
 https://couchdb-python.readthedocs.io/en/latest/client.html#server
'''

from couchdb import Server
from couchdb.mapping import Document, TextField, IntegerField, DateTimeField, DictField, Mapping
from couchdb import http, json, util
from uuid import uuid4
import os
import sys
import hashlib

db = Server("http://%s:%s@db_data:5984/" % (os.environ['COUCHDB_USER'],os.environ['COUCHDB_PASSWORD']))

users = db['users']
plant_device = db['plant_device']
plant_types = db['plant_types']
plant_device_reading = db['plant_device_reading']


'''
Database documents can be stored using Document class inheritance.
Create the document class and their attributes.
To store pick the database that you want to store the document in - aka one of the ones above -
and use the key word <yourdocument>.store(<db_name>)

@EXAMPLE
newUser = User(username='John', email='John@gmail.com', hashpass='sr$5jgRGr774')
newUser.store(users)
'''


class User(Document):
    username = TextField()
    email = TextField()
    hashpass = TextField()
    phoneNum = TextField()
    notificationMethod = TextField()


class PlantDevice(Document):
    name = TextField()
    username = TextField()
    species = TextField()
    location = DictField(Mapping.build(
        geolocationCity = TextField(),
        geolocationState = TextField(),
        indoorsOutdoors = TextField(),
    ))
    wateringConditionTrigger = TextField()
    wateringConditionValue = TextField()
    additionalNotes = TextField()

class PlantDeviceReading(Document):
    username = TextField()
    devicetype = TextField()
    device_id = TextField()
    timeReading = TextField()
    datetime = IntegerField()
    values = DictField(Mapping.build(
        moistureLevel = TextField(),
        waterLevel = TextField(),
        pumpStatus = TextField(),
    ))

class PlantTypes(Document):
    plant = TextField()
    minMoisture = TextField()

'''
@findusername()
Param   : username
Purpose : Used to find a user.
          (1). Checks to see if the user exists in couchdb.
          (2). If the user exists then return a True flag
          (3). If the user doesn't exist returns False flag
Returns : (1)users id, (2)False
'''
def findUsername(uname):
    for user in users.view('_all_docs'):
        if user.id.lower() == uname.lower():
            return True

    return False



'''
@finEmail()
Param   : email
Purpose : Used to find email.
          (1). Checks to see if the email in couchdb.
          (2). If the email exists then return a True flag
          (3). If the email doesn't exist returns False flag
Returns : (1)True, (2)False
'''
def findEmail(email):
    for user in users.view('_all_docs'):
        doc = users[user.id]
        if(doc['email'].lower() == email.lower()):
            return True
    return False


def findPlantByUser(uname):
    """Find plant by user.

    Args:
        uname (str): Username of user

    Returns:
        obj: Plants that belong to the user
    """
    mango = {
        'selector': {'username': {"$eq": uname}},
        'fields': ['_id', 'name', 'species', 'location', 'additionalNotes'],
        'sort': ['name']
    }

    try:
        devices = plant_device.find(mango)
    except Exception as e:
        print("Failed to get devices.", e)
        if 'no_usable_index' in str(e):
            design_doc = {
                            "_id": "_design/name-index",
                            "language": "query",
                            "views": {
                                "name-index": {
                                "map": {
                                    "fields": {
                                    "name": "asc"
                                    },
                                    "partial_filter_selector": {}
                                },
                                "reduce": "_count",
                                "options": {
                                    "def": {
                                    "fields": [
                                        {
                                        "name": "asc"
                                        }
                                    ]
                                    }
                                }
                                }
                            }
                        }
            plant_device.save(design_doc)
            devices = plant_device.find(mango)
        else:
            devices = {}

    return devices

def findReadings(device_id, reading_type):
    """Find readings by device ID

    Args:
        device_id (str): Device id
        reading_type (str): Type of reading: "moisture" "availability" "pump"

    Returns:
        list[obj]: list with 1 most recent reading
    """
    mango = {
        "selector": {
            "device_id": device_id,
            "type": reading_type
        },
        "sort": [
            {
                "time_reading": "desc"
            }
        ],
        "limit": 1
    }
    try:
        reading = plant_device_reading.find(mango)
    except Exception as e:
        print("Failed to get reading", e)
        if 'no_usable_index' in str(e):
            design_doc =  { "_id": "_design/time_reading_index",
                            "language": "query",
                            "views": {
                                "time_reading-index": {
                                "map": {
                                    "fields": {
                                        "time_reading": "desc"
                                    },
                                    "partial_filter_selector": {}
                                },
                                "reduce": "_count",
                                "options": {
                                    "def": {
                                        "fields": [
                                            {
                                                "time_reading": "desc"
                                            }
                                        ]
                                    }
                                }
                                }
                            }
                        }
            plant_device_reading.save(design_doc)
            reading = plant_device_reading.find(mango)
        else:
            reading = {}

    return reading




'''
@authenticate()
Param   : username, password
Purpose : Used to login a user.
          (1). Checks to see if the user exists in couchdb.
Returns : (1). Returns False if user id isn't found
          (2). Returns True if user is found
          (3). Returns 2 if incorrect password
          (4). Returns 3 if the username doesn't match
'''
def authenticateUser(uname, upass):
    doc = users[uname]
    print(doc['username'])

    if (doc == ''):
        return False
    else:
        hashpass = hashlib.sha256(upass.encode('utf-8')).hexdigest()
        if (doc['username'] == uname):
            print(hashpass)
            if (doc['hashpass'] == hashpass):
                return True
            else:
                return '3'
        else:
            return '2'


'''
@adduser().notification
Param   : username, email, password
Purpose : Used to register a user.
          (1). Checks to see if the user exists in couchdb.
          (2). If the user exists then return False flag
          (3). If the user doesn't exist it will add the user to couchdb
Returns : (1)users id, (2)False
'''
def adduser(uname, uemail, upass):
    usernameExists = '2'
    emailExists = '3'

    if (findUsername(uname) == False):
        if(findEmail(uemail) == False):
            hashpass = hashlib.sha256(upass.encode('utf-8')).hexdigest()
            user = User(id=uname, username=uname, email=uemail, hashpass=hashpass)
            user.store(users)
            return user.id
        else:
            return emailExists
    else:
        return usernameExists

'''
@getuser()
Param   : username
Purpose : Used to find a user.
          (1). Checks to see if the user exists in couchdb.
          (2). If the user exists then return a True flag
          (3). If the user doesn't exist returns False flag
Returns : (1)user object, (2)False
'''
def getuser(uname):

    for user in users.view('_all_docs'):
        if user.id.lower() == uname.lower():
            return user
    return False




'''
@updateoptions()
Param   : username, email, phonenum, method
Purpose : Used to update a user's notification options.
          (1). Finds revision number of user in DB.
          (2). If method is email, update the user object with new email.
          (3). If method is phone, update the user object with new phone number.
          (4). Post updated user object to user DB.
Returns : (1)updated revision number, (2)False
'''
def updateoptions(data):

    user = users.get(data['username'])
    if user == '':
        return False

    user['notificationMethod'] = data['notificationMethod']
    if data['notificationMethod'] == 'sms':
        user['phoneNum'] = data['phoneNum']

    if data['notificationMethod'] == 'email':
        user['email'] = data['emailAddress']
        user['phoneNum'] = None

    user['notificationTriggers'] = data['notificationTriggers']
    users.save(user)

    return True

'''
@changepassword()
Param   : data[username, password]
Purpose : Used to update a user's notification options.
          (1). Finds revision number of user in DB.
          (2). If password is different, update password.
          (3). Post updated user object to user DB.
Returns : (1)True, (2)False
''' 
def changepassword(data):
    username = data['username']
    password = data['password']

    user = users.get(username)
    if user == '' or user == None:
        return False

    hashpass = hashlib.sha256(password.encode('utf-8')).hexdigest()

    # From Tii's code: don't allow repeat passwords (is this necessary?)
    if user['hashpass'] != hashpass:
        user['hashpass'] = hashpass
    ###

    users.save(user)
    return True

'''
@findPlantName()
Param   : pName
Purpose : Used to check if an existing plant exists in the database for that user.
          (1). Checks to see if the name exists in couchdb.
          (2). If name exists, returns true, to not push to database
          (3). If plant doesn't exist, returns false, to push to database
Returns : (1). Returns True to not push to database
          (2). Returns False to push to database
'''
def findPlantName(pName, pUser):
    for plant in plant_device.view('_all_docs'):
        print("id:", plant.id)
        doc = plant_device[plant.id]
        if 'username' in doc:
            print(doc['username'])
            if(doc['username'].lower() == pUser.lower()):
                if(doc['name'].lower() == pName.lower()):
                    return plant.id
    return False



'''
@addPlant()
Param   : data
Purpose : Used to add a new plant device.
          (1). Checks to see if the user exists in couchdb.
          (2). If user exists, it checks to see if that plant device exists already
          (3). If plant doesn't exist, adds the plant to the database under that username
          (4). If plant exists, it returns a check to account/views that notifies the user that the plant cannot be added
Returns : (1). Check to account/views if the plant device can be added or not
'''
def addPlant(data):
    pName = data['name']
    pUser = data['username']
    answer = findPlantName(pName, pUser)
    if(answer == False):
        plant = PlantDevice(
            username=data['username'],
            name=data['name'],
            species=data['species'],
            location=dict(geolocationCity=data['geolocationCity'],geolocationState=data['geolocationState'],indoorsOutdoors=data['indoorsOutdoors']),
            wateringConditionTrigger=data['wateringConditionTrigger'],
            wateringConditionValue=data['wateringConditionValue'],
            additionalNotes=data['additionalNotes'])
        plant.store(plant_device)
        print("Plant stored successfully")
        return True
    else:
        doc = plant_device[answer]
        doc['species'] = data['species']
        doc['location'] = dict(geolocationCity=data['geolocationCity'],geolocationState=data['geolocationState'],indoorsOutdoors=data['indoorsOutdoors'])
        doc['wateringConditionTrigger'] = data['wateringConditionTrigger']
        doc['wateringConditionValue'] = data['wateringConditionValue']
        doc['additionalNotes'] = data['additionalNotes']
        plant_device.save(doc)

        print("Plant updated successfully")
        return False




'''
@findtype()
Param   : planttype
Purpose : Finding the plant's moisture level
Returns : (1).moisture level
'''
def findPlantByType(planttype):
    for plant in plant_types.view('_all_docs'):
        doc = plant_types[plant.id]
        if 'min_moisture' in doc:
            if doc['plant'] == planttype:
                value = doc['min_moisture']
                print(value)
                return value
    
    return False
