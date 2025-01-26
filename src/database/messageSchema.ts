import { MessageInterface } from "@/app/(home)/messages/mock-data";
import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  senderName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ["text", "image"], required: true },
});

export default mongoose.models.Message || mongoose.model<MessageInterface>("Message", MessageSchema);
