import torch
from torch.utils.data import Dataset, DataLoader
from utils.database import get_events_collection

# Load data from MongoDB
collection = get_events_collection()
events_data = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id`

# Map user and event IDs to indices
user_to_idx = {user: idx for idx, user in enumerate(set(e['user_id'] for e in events_data))}
event_to_idx = {event: idx for idx, event in enumerate(set(e['event_id'] for e in events_data))}

# Add index mappings to events_data
for e in events_data:
    e['user_idx'] = user_to_idx[e['user_id']]
    e['event_idx'] = event_to_idx[e['event_id']]

# Define hyperparameters
NUM_USERS = len(user_to_idx)
NUM_EVENTS = len(event_to_idx)
EMBEDDING_SIZE = 50

# Create dataset
class EventDataset(Dataset):
    def __init__(self, data):
        self.users = torch.tensor([d['user_idx'] for d in data], dtype=torch.long)
        self.events = torch.tensor([d['event_idx'] for d in data], dtype=torch.long)
        self.labels = torch.ones(len(data))

    def __len__(self):
        return len(self.users)

    def __getitem__(self, idx):
        return self.users[idx], self.events[idx], self.labels[idx]

dataset = EventDataset(events_data)
train_size = int(0.8 * len(dataset))
test_size = len(dataset) - train_size
train_dataset, test_dataset = torch.utils.data.random_split(dataset, [train_size, test_size])

print(f"Length of train dataset: {len(train_dataset)}")

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

# Define the model
class MatrixFactorization(torch.nn.Module):
    def __init__(self, num_users, num_events, embedding_dim):
        super(MatrixFactorization, self).__init__()
        self.user_embedding = torch.nn.Embedding(num_users, embedding_dim)
        self.event_embedding = torch.nn.Embedding(num_events, embedding_dim)

    def forward(self, user_idx, event_idx):
        user_vector = self.user_embedding(user_idx)
        event_vector = self.event_embedding(event_idx)
        return (user_vector * event_vector).sum(1)
