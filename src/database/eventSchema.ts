import mongoose, { Schema, Document } from "mongoose";

// Event Schema Interface for TypeScript
interface IEvent extends Document {
  name: string;
  description: string;
  hobby: string;
  owner: Schema.Types.ObjectId; // Reference to User model
  participants: Schema.Types.ObjectId[]; // List of User references
  startingParticipants: number;
  capacity: number;
  date: Date;
  location: { type: string; coordinates: [number, number] };
  imageUrl?: string;
  categories?: string[];
  organizer?: string;
  attendees?: number;
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
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  imageUrl: { type: String },
  categories: { type: [String] },
  organizer: { type: String },
  attendees: { type: Number },
});

// Model: Checks if the Event model already exists, otherwise creates it
export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
