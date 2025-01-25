import mongoose, { Schema } from "mongoose";

//! Example user schema. Not guaranteed to work
const UserSchema = new Schema({
  phoneNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  // Events will be a list of Event schema
  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  // Friends will be a list of User schema
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
