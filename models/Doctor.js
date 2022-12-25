const { Schema, model } = require("mongoose");

const Doctor = new Schema({
  fullName: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  doctorImage: { type: String },
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
  departmentId: { type: String, required: true },
  scientificWork: {
    uz: { type: String },
    cuz: { type: String },
    ru: { type: String },
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department"
  }
});

module.exports = model("Doctor", Doctor);