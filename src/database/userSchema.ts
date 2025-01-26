import mongoose, { Document, Schema } from "mongoose";
import Event, { IEvent } from "@/database/eventSchema"; // Assuming you have a type for Event

// User Interface for TypeScript
export interface IUser extends Document {
  phoneNumber: string; // User's phone number
  firstName: string; // User's first name
  lastName: string; // User's last name
  password: string; // User's password
  events: mongoose.Types.ObjectId[] | IEvent[]; // List of Event references or populated Event documents
  friends: mongoose.Types.ObjectId[] | IUser[]; // List of User references or populated User documents
  hobbies: string[]; // List of hobbies
}

// User Schema
const UserSchema = new Schema<IUser>({
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  events: [{ type: Schema.Types.ObjectId, ref: "event" }], // Reference to Event model
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }], // Reference to User model
  hobbies: [{ type: String, required: true }], // List of hobbies
});

// Export the model
export default mongoose.models.User || mongoose.model<IUser>("user", UserSchema);
