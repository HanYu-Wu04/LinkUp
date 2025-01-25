import torch
from torch.utils.data import Dataset

class InteractionDataset(Dataset):
    def __init__(self, interactions, user_to_idx, event_to_idx):
        self.interactions = interactions
        self.user_to_idx = user_to_idx
        self.event_to_idx = event_to_idx

    def __len__(self):
        return len(self.interactions)

    def __getitem__(self, idx):
        user, event, interaction = self.interactions[idx]
        return self.user_to_idx[user], self.event_to_idx[event], interaction
