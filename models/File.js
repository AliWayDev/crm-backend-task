const { Schema, model } = require("mongoose");

const File = new Schema({
    _id: { type: String },
    name: { type: String },
});

module.exports = model("File", File);
