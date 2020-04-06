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
    email = IntegerField()
    hashpass = TextField()


db = Server("http://%s:%s@db_data:5984/" % (os.environ['COUCHDB_USER'],os.environ['COUCHDB_PASSWORD']))

users = db['users']
plant_device = db['plant_device']
plant_types = db['plant_types']
plant_device_reading = db['plant_device_reading']

def finduser(username, password, email=None):
    for user in users:
        print(user)

def adduser(uname, uemail, upass):
    x = 0
    map_fun = '''function(doc) {
         if (doc.type == '')
         emit(doc.username, null);
         }'''
    for row in users.query(map_fun):
        print(row.key)
    # else:
    #     hashpass = hashlib.sha256(upass.encode('utf-8')).hexdigest()
    #     user = User(username=uname, email=uemail, hashpass=hashpass)
