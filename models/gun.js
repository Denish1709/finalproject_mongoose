const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const gunSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
});

const Gun = model("Gun", gunSchema);
module.exports = Gun;
