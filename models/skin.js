const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const agentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mainImg: {
    type: String,
    require: true,
  },
  image1: {
    type: String,
  },
  image2: {
    type: String,
  },
  image3: {
    type: String,
  },
  image4: {
    type: String,
  },
  image5: {
    type: String,
  },
});

const Skin = model("Skin", agentSchema);
module.exports = Skin;
