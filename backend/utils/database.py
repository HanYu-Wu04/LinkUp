import os
from pymongo import MongoClient


# Pull MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient( MONGO_URI)
print(MONGO_URI)
DATABASE_NAME = "test"
COLLECTION_NAME = "events"

def get_database():
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]
    return db

def get_events_collection():
    db = get_database()
    return db[COLLECTION_NAME]
