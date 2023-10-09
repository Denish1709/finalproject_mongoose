const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const agentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  basicAbilities: {
    type: String,
    require: true,
  },
  passiveAbilities: {
    type: String,
    require: true,
  },
  signatureAbilities: {
    type: String,
    require: true,
  },
  ultimateAbilities: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

const Agent = model("Agent", agentSchema);
module.exports = Agent;
