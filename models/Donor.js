import { Schema, model } from "mongoose";

const Donor = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  donorName: { type: String },
  phoneNumber: { type: String },
  bloodType: { type: String },
  isBloodType: { type: Boolean },
});

export default model("Donor", Donor);
