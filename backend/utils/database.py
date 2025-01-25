import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Pull MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")

# Check if the URI is available
if not MONGO_URI:
    raise ValueError("MongoDB URI not found in environment variables")

client = MongoClient(MONGO_URI)

# Define database and collection names
DATABASE_NAME = "test"
COLLECTION_NAME = "events"

def get_database():
    # Use the global client to access the database
    db = client[DATABASE_NAME]
    return db

def get_events_collection():
    db = get_database()
    return db[COLLECTION_NAME]

# Testing the connection by printing the MongoDB URI
print(f"Connected to MongoDB at {MONGO_URI}")
