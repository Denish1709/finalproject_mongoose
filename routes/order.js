const express = require("express");
const axios = require("axios");
const router = express.Router();

const Order = require("../models/order");

const {
  BILLPLZ_API_KEY,
  BILLPLZ_API_URL,
  BILLPLZ_COLLECTION_ID,
} = require("../config");

const authMiddleware = require("../middleware/auth");
const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (req.user && req.user.role === "user") {
      filter.customerName = req.user.name;
    }

    res
      .status(200)
      .send(await Order.find(filter).populate("skins").sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: "Order not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Order.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Order creation failed" });
  }
});

router.post("/", async (req, res) => {
  try {
    const billplz = await axios({
      method: "POST",
      url: BILLPLZ_API_URL + "v3/bills",
      auth: {
        username: BILLPLZ_API_KEY,
        password: "",
      },
      data: {
        collection_id: BILLPLZ_COLLECTION_ID,
        email: req.body.customerEmail,
        name: req.body.customerName,
        amount: parseFloat(req.body.totalPrice) * 100,
        description: req.body.description,
        callback_url: "http://localhost:3000/verify-payment",
        redirect_url: "http://localhost:3000/verify-payment",
      },
    });
    const newOrder = new Order({
      customerName: req.body.customerName,
      customerEmail: req.body.customerEmail,
      skins: req.body.skins,
      totalPrice: req.body.totalPrice,
      billplz_id: billplz.data.id,
    });
    await newOrder.save();

    res.status(200).send(billplz.data);
  } catch (error) {
    res.status(400).send({
      message: error._message
        ? error._message
        : error.response.data.error.message[0],
    });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const order_id = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(order_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const order_id = req.params.id;
    const deleteOrder = await Order.findByIdAndDelete(order_id);
    res.status(200).send(deleteOrder);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
