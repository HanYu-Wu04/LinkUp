from flask import Blueprint, request, jsonify
import torch
from models.matrix_factorization import MatrixFactorization, event_to_idx, NUM_USERS, NUM_EVENTS
from utils.database import get_events_collection

recommend_bp = Blueprint('recommend', __name__)

# Load the trained model
MODEL_PATH = "model_weights.pth"
model = torch.load(MODEL_PATH)
model.eval()

@recommend_bp.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id', type=str)

    # Validate user
    collection = get_events_collection()
    user_events = list(collection.find({"user_id": user_id}, {"_id": 0}))
    if not user_events:
        return jsonify({"error": "User not found or no events attended"}), 404

    # Generate recommendations
    user_idx = event_to_idx[user_id]
    user_vector = model.user_embedding(torch.tensor([user_idx]))
    event_vectors = model.event_embedding.weight
    scores = torch.matmul(user_vector, event_vectors.T).squeeze()
    top_event_indices = scores.argsort(descending=True)[:10]

    # Map back to event IDs
    recommended_event_ids = [list(event_to_idx.keys())[i] for i in top_event_indices]
    recommendations = list(
        collection.find({"event_id": {"$in": recommended_event_ids}}, {"_id": 0, "event_id": 1, "event_name": 1, "category": 1})
    )
    return jsonify(recommendations)
