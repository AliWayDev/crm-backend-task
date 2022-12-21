const { Schema, model } = require("mongoose");

const Doctor = new Schema({
  fullName: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  avatar: { type: String },
  description: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  specialty: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  workActivity: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  scientificDegree: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  workingDepartment: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  departmentId: { type: String, unique: true, required: true },
  scientificWork: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
});

module.exports = model("Doctor", Doctor);