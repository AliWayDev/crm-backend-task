const { Schema, model } = require("mongoose");

const Patcient = new Schema({
    firstName: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    middleName: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    lastName: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    dadyFullName: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    dadysPhoneNumber: { type: String },
    momyFullName: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    momysPhoneNumber: { type: String },
    nameOfDisease: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    aboutTheDisease: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    cardNumber: { type: String },
    whosCard: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    departmentBeingTreated: { type: String },
});

module.exports = model("Patcient", Patcient);