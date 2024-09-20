import { Schema, model } from "mongoose";

const User = new Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  lastActivity: { type: String },
  status: { type: String },
  password: { type: String }
});

export default model("User", User);
