''' 
 Use CouchDB to create a CouchDB client
 This is an independent manager for the database
 This is to hopefully consolidate the access to the db
 Could potentially migrate to '/account/views.py'. 
 Since all apps will need it, this might be unlikely.

Documentations for couchdb and python connection
https://couchdb-python.readthedocs.io/en/latest/client.html#server

'''
from couchdb import Server
from couchdb.mapping import Document, TextField, IntegerField, DateTimeField
from couchdb import http, json, util
from uuid import uuid4
import os, sys
import hashlib

from rest_framework.authtoken.models import Token

class User(Document):
    username = TextField()
    email = TextField()
    hashpass = TextField()

class PlantDevice(Document):
    name = TextField()
    species = TextField()
    geolocationCity = TextField()
    geolocationState = TextField()
    indoorsOutdoors = TextField()
    wateringCoditionTrigger = TextField()
    wateringConditionValue = TextField()
    additionalNotes = TextField()

db = Server("http://%s:%s@db_data:5984/" % (os.environ['COUCHDB_USER'],os.environ['COUCHDB_PASSWORD']))
# db.resource.session.disable_ssl_verification()

users = db['users']
plant_device = db['plant_device']
plant_types = db['plant_types']
plant_device_reading = db['plant_device_reading']


'''
@finduser()
Param   : username
Purpose : Used to find a user.
          (1). Checks to see if the user exists in couchdb.
          (2). If the user exists then return a True flag
          (3). If the user doesn't exist returns False flag
Returns : (1)users id, (2)False
'''
def finduser(uname):
    
    for user in users.view('_all_docs'):
        if user.id.lower() == uname.lower():
            return user.id
    
    return False


'''
@authenticate()
Param   : username, password
Purpose : Used to login a user.
          (1). Checks to see if the user exists in couchdb.
          (2). Returns False if user id isn't found
          (3). Returns True if user is found
          (4). Returns 2 if incorrect password
          (5). Returns 3 if the username doesn't match
Returns : (1)users id, (2)False
'''
def authenticateUser(uname, upass):
    doc = users[uname]
    print(doc)
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
@adduser()
Param   : username, email, password
Purpose : Used to register a user.
          (1). Checks to see if the user exists in couchdb.
          (2). If the user exists then return False flag
          (3). If the user doesn't exist it will add the user to couchdb
Returns : (1)users id, (2)False
'''
def adduser(uname, uemail, upass):
    existErr = False

    if (finduser(uname) == False):
        hashpass = hashlib.sha256(upass.encode('utf-8')).hexdigest()
        user = User(username=uname, email=uemail, hashpass=hashpass)
        user.store(users)
        return user.id
    else:
        return existErr

def addplant(data):
    print("Gottem")
    #plant = PlantDevice(name=data['name'],species=data['species'],geolocationCity=data['geolocationCity'],geolocationState=data['geolocationState'],indoorsOutdoors=data['indoorsOutdoors'],wateringCoditionTrigger=data['wateringCoditionTrigger'],wateringConditionValue=data['wateringConditionValue'],additionalNotes=data['additionalNotes'])
    #plant.store(plant_device)


# def addDevice(user_id, content):
#     plant_device['05'] = content



# def addReading():