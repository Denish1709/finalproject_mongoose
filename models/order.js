const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const Product = require("./product");

const orderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  skins: [{ type: Schema.Types.ObjectId, ref: "Skin" }],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Paid", "Failed", "Shipped", "Delivered"],
  },
  billplz_id: {
    type: String,
    required: true,
  },
  paid_at: {
    type: Date,
  },
});

const Order = model("Order", orderSchema);
module.exports = Order;
