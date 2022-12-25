const { Schema, model } = require("mongoose");

const Department = new Schema({
    name: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    description: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    doctors: [{
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    }]
});

module.exports = model("Department", Department);
