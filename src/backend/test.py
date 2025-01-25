from pymongo import MongoClient
import os

# Establishing MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))

db = client['test']
collection = db['users']

# Count the number of records in the collection
record_count = collection.count_documents({})
print(f"Number of records fetched: {record_count}")

# Fetch data from the collection
train_data = collection.find()

# Check for data presence
if record_count == 0:
    print("No data found in the dataset")
else:
    # Get the first document from the cursor
    first_document = next(train_data, None)
    print(f"Data sample: {first_document}")
