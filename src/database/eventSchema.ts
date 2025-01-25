import mongoose, { Schema, Document } from "mongoose";

// Event Schema Interface for TypeScript
interface IEvent extends Document {
  name: string;
  description: string;
  hobby: string;
  owner: mongoose.Types.ObjectId; // Reference to User model
  participants: mongoose.Types.ObjectId[]; // List of User references
  startingParticipants: number;
  capacity: number;
  date: Date;
  location: string;
  imageUrl?: string;
  categories?: string[];
  organizer?: string;
  attendees?: number;
  isRecommended?: boolean;
}

const EventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  hobby: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  startingParticipants: { type: Number, required: true },
  capacity: { type: Number, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String },
  categories: { type: [String] },
  organizer: { type: String },
  attendees: { type: Number },
  isRecommended: { type: Boolean, default: false }, // Default to false
});

// Model: Checks if the Event model already exists, otherwise creates it
export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
