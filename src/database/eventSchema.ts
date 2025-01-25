import mongoose, { Schema, Document } from "mongoose";

// TODO: add radius for location. This will be used to search for events within a certain radius

/**
 * Example POINT
  const denver = { type: 'Point', coordinates: [-104.9903, 39.7392] };
    return City.create({ name: 'Denver', location: denver }).
    then(() => City.findOne().where('location').within(colorado)).
  then(doc => assert.equal(doc.name, 'Denver'));
 */
// Event Schema Interface for TypeScript
export interface IEvent extends Document {
  name: string;
  description: string;
  hobby: string;
  owner: Schema.Types.ObjectId; // Reference to User model
  participants: Schema.Types.ObjectId[]; // List of User references
  attendees: Schema.Types.ObjectId[];
  startingParticipants: number;
  capacity: number;
  date: Date;
  location: { type: string; coordinates: [number, number] };
  imageUrl?: string;
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
  attendees: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Model: Checks if the Event model already exists, otherwise creates it
export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
