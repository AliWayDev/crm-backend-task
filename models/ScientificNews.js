const { Schema, model } = require("mongoose");

const ScientificNews = new Schema({
    name: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    scientificUserfullName: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    description: {
        uz: { type: String },
        cuz: { type: String },
        ru: { type: String },
    },
    youTubeLink: { type: String }
});

module.exports = model("ScientificNews", ScientificNews);