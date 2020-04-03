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
from couchdb import http, json, util
from uuid import uuid4
import os
user = os.environ['COUCHDB_USER']
password = os.environ['COUCHDB_PASSWORD']
db = Server("http://%s:%s@db_data:5984/" % (user,password))


def createUser(content):
    userdb = db['user']
    
