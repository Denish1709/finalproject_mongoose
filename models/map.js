const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const mapSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Map = model("Map", mapSchema);
module.exports = Map;
