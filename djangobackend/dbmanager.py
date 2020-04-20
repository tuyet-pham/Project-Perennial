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
import os, sys
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
    datetime = TextField()
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
            return user.id
    
    return False



def findEmail(email):
    for user in users.view('_all_docs'):
        doc = users[user.id]
        if(doc['email'].lower() == email.lower()):
            return True
    
    return False

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
        # hashpass = hashlib.sha256(upass.encode('utf-8')).hexdigest()
        if (doc['username'] == uname):
            if (doc['hashpass'] == upass):
                return True
            else:
                return 3
        else:
            return 2


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
    usernameExists = 2
    emailExists = 3

    if (findUsername(uname) == False):
        if(findEmail(email) == False):
            hashpass = hashlib.sha256(upass.encode('utf-8')).hexdigest()
            user = User(id=uname, username=uname, email=email, hashpass=hashpass)
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
# def updateoptions(uname, uemail, uphone, umethod):
def updateoptions(data):
    username = data['username']
    # user = getuser(username)
    # print(user)

    user = users.get(username)
    user['notificationMethod'] = data['notificationMethod']
    if data['notificationMethod'] == 'sms':
        user['phoneNum'] = data['phoneNum']
        
    if data['notificationMethod'] == 'email':
        user['email'] = data['emailAddress']
        user['phoneNum'] = None


    user['notificationTriggers'] = data['notificationTriggers']

    print(user)

    users.save(user)

    return 1

     
def addplant(data):
    print("Gottem")
    #plant = PlantDevice(name=data['name'],species=data['species'],geolocationCity=data['geolocationCity'],geolocationState=data['geolocationState'],indoorsOutdoors=data['indoorsOutdoors'],wateringCoditionTrigger=data['wateringCoditionTrigger'],wateringConditionValue=data['wateringConditionValue'],additionalNotes=data['additionalNotes'])
    #plant.store(plant_device)


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
def findPlantName(pName):
    for plant in plant_device.view('_all_docs'):
        doc = plant_device[plant.id]
        if(doc['name'].lower() == pName.lower()):
            return True
    
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
    if(findPlantName(pName) == False):
        plant = PlantDevice(
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
        print("Plant name exists")
        return False


# def addReading():
