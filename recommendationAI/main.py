import torch
import torch.optim as optim
from torch.utils.data import DataLoader
from data.dataset import InteractionDataset
from models.matrix_factorization import MatrixFactorization

# Example data
users = [1, 2, 3, 4]
events = [101, 102, 103, 104]
interactions = [
    (1, 101, 1), (1, 102, 1), (2, 101, 1), (2, 104, 1),
    (3, 103, 1), (3, 104, 1), (4, 102, 1), (4, 103, 1)
]

user_to_idx = {u: i for i, u in enumerate(users)}
event_to_idx = {e: i for i, e in enumerate(events)}
idx_to_user = {i: u for u, i in user_to_idx.items()}
idx_to_event = {i: e for e, i in event_to_idx.items()}

num_users = len(users)
num_events = len(events)
embedding_dim = 10
batch_size = 4
num_epochs = 20
learning_rate = 0.01

# Dataset and DataLoader
dataset = InteractionDataset(interactions, user_to_idx, event_to_idx)
dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

# Model, Loss, Optimizer
model = MatrixFactorization(num_users, num_events, embedding_dim)
criterion = torch.nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Training Loop
for epoch in range(num_epochs):
    total_loss = 0
    for user_idx, event_idx, interaction in dataloader:
        user_idx = user_idx.long()
        event_idx = event_idx.long()
        interaction = interaction.float()

        # Forward pass
        prediction = model(user_idx, event_idx)
        loss = criterion(prediction, interaction)

        # Backward pass
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    print(f"Epoch {epoch + 1}/{num_epochs}, Loss: {total_loss:.4f}")

# Recommendation Function
def recommend(user_id, top_k=3):
    user_idx = user_to_idx[user_id]
    user_idx_tensor = torch.tensor([user_idx] * num_events, dtype=torch.long)
    event_idx_tensor = torch.tensor(range(num_events), dtype=torch.long)

    with torch.no_grad():
        predictions = model(user_idx_tensor, event_idx_tensor).numpy()
    recommended_event_indices = predictions.argsort()[-top_k:][::-1]
    return [idx_to_event[i] for i in recommended_event_indices]

# Example Recommendations
print(f"Recommendations for User 1: {recommend(1)}")
print(f"Recommendations for User 2: {recommend(2)}")
