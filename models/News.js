const { Schema, model } = require("mongoose");

const News = new Schema({
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
    youTubeLink: { type: String }
});

module.exports = model("News", News);