const { Schema, model } = require("mongoose");

const Donor = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  donorName: { type: String },
  phoneNumber: { type: String },
  bloodType: { type: String },
  isBloodType: { type: Boolean },
});

module.exports = model("Donor", Donor);
