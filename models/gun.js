const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gunSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  // },
  // headDamage: {
  //   type: String,
  //   require: true,
  // },
  // bodyDamage: {
  //   type: String,
  //   require: true,
  // },
  // footDamage: {
  //   type: String,
  //   require: true,
  // },
  image: {
    type: String,
  },
  // price: {
  //   type: Number,
  //   required: true,
  // },
  category: {
    type: String,
    required: true,
  },
});

const Gun = model("Gun", gunSchema);
module.exports = Gun;
