import torch
import torch.nn as nn

class MatrixFactorization(nn.Module):
    def __init__(self, num_users, num_events, embedding_dim):
        super(MatrixFactorization, self).__init__()
        self.user_embedding = nn.Embedding(num_users, embedding_dim)
        self.event_embedding = nn.Embedding(num_events, embedding_dim)

    def forward(self, user_idx, event_idx):
        user_vec = self.user_embedding(user_idx)
        event_vec = self.event_embedding(event_idx)
        interaction = (user_vec * event_vec).sum(dim=1)
        return interaction
