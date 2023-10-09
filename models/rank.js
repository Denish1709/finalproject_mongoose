const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const rankSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
});

const Rank = model("Rank", rankSchema);
module.exports = Rank;
