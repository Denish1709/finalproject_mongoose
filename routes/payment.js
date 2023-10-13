const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const Order = require("../models/order");
const { BILLPLZ_X_SIGNATURE } = require("../config");

router.post("/", async (req, res) => {
  try {
    const billplz_id = req.body.billplz_id;
    const billplz_paid = req.body.billplz_paid;
    const billplz_paid_at = req.body.billplz_paid_at;
    const billplz_x_signature = req.body.billplz_x_signature;

    const billplz_string = `billplzid${billplz_id}|billplzpaid_at${billplz_paid_at}|billplzpaid${billplz_paid}`;
    const x_signature = crypto
      .createHmac("sha256", BILLPLZ_X_SIGNATURE)
      .update(billplz_string)
      .digest("hex");
    if (billplz_x_signature !== x_signature) {
      res.status(400).send({ message: "Signature not valid" });
    }

    const order = await Order.findOne({ billplz_id: billplz_id });

    if (!order) {
      res.status(400).send({ message: "Order not found" });
    }

    order.status = billplz_paid === "true" ? "Paid" : "Failed";
    order.paid_at = billplz_paid_at;

    const newOrder = await order.save();

    res.status(200).send(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
