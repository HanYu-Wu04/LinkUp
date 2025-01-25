from models.matrix_factorization import train_loader, test_loader, MatrixFactorization, NUM_USERS, NUM_EVENTS, EMBEDDING_SIZE
import torch
import torch.nn as nn
import torch.optim as optim

model = MatrixFactorization(NUM_USERS, NUM_EVENTS, EMBEDDING_SIZE)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(10):
    model.train()
    total_loss = 0
    for user_idx, event_idx, _ in train_loader:
        optimizer.zero_grad()
        predictions = model(user_idx, event_idx)
        labels = torch.ones_like(predictions)
        loss = criterion(predictions, labels)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    print(f"Epoch {epoch+1}, Loss: {total_loss:.4f}")

torch.save(model, "model_weights.pth")
print("Model saved as model_weights.pth")
