import mongoose, { Schema } from "mongoose";

// TODO: Check if we can optimize date, how to filtr events automatically if date is passed.
const EventSchema = new Schema({
  name: { type: String, required: true },
  // Check if hobby is in preset list
  hobby: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  // Participants will be a list of User schema
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  startingParticipants: { type: Number, required: true },
  capacity: { type: Number, required: true },
  // Date and time of event
  date: { type: Date, required: true },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
