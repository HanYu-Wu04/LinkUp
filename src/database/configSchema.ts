import mongoose, { Schema } from "mongoose";

//! Example user schema. Not guaranteed to work
const ConfigSchema = new Schema({
  name: { type: String, required: true },
  // Value can be any type
  value: { type: Schema.Types.Mixed, required: true },
});

export default mongoose.models.Config || mongoose.model("Config", ConfigSchema);
