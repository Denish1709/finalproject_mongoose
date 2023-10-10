const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const agentSchema = new Schema({
  skinName: {
    type: String,
  },
  bundlePrice: {
    type: Number,
  },
  gunPrice: {
    type: Number,
  },
  meleePrice: {
    type: Number,
  },
  gunName2: {
    type: String,
  },
  gunName3: {
    type: String,
  },
  gunName4: {
    type: String,
  },
  gunName5: {
    type: String,
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
