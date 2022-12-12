import { Schema, model } from "mongoose";

const Doctor = new Schema({
  fullName: { type: String },
  doctorImage: { type: String },
  description: { type: String },
  specialty: { type: String },
  workActivity: { type: String },
  scientificDegree: { type: String },
  WorkingDepartment: { type: String },
  departmentId: { type: String, unique: true, required: true },
  scientificWork: { type: String },
});

export default model("Doctor", Doctor);
