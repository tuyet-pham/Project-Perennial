''' 
 Use CouchDB to create a CouchDB client
 This is an independent manager for the database
 This is to hopefully consolidate the access to the db
 Could potentially migrate to '/account/views.py'. 
 Since all apps will need it, this might be unlikely.
'''
import couchdb
import os
user = os.environ['COUCHDB_USER']
password = os.environ['COUCHDB_PASSWORD']
db = couchdb.Server("http://%s:%s@db_data:5984/" % (user,password))



def viewAll():
    data = []
    for dbname in db:
        data.append(dbname)
    return data