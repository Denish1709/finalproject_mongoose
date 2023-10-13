const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const agentSchema = new Schema({
  skinName: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Skin = model("Skin", agentSchema);
module.exports = Skin;
