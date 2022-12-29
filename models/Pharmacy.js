const { Schema, model } = require("mongoose");

const Pharmacy = new Schema({
    name: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    source: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    amount: { type: String },
    cost: { type: String },
});

module.exports = model("Pharmacy", Pharmacy);