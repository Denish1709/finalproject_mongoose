const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URL } = require("./config");

const app = express();
app.use(express.json());
const port = 5000;

// setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

mongoose
  .connect(MONGODB_URL + "valorantDB")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// routes
const gunRouter = require("./routes/gun");
const rankRouter = require("./routes/rank");
const mapRouter = require("./routes/map");
const skinRouter = require("./routes/skin");
const imageRouter = require("./routes/image");
const agentRouter = require("./routes/agent");
const paymentRouter = require("./routes/payment");
const authRouter = require("./routes/auth");
const orderRouter = require("./routes/order");

app.use("/guns", gunRouter);
app.use("/ranks", rankRouter);
app.use("/maps", mapRouter);
app.use("/skins", skinRouter);
app.use("/images", imageRouter);
app.use("/agents", agentRouter);
app.use("/payment", paymentRouter);
app.use("/auth", authRouter);
app.use("/orders", orderRouter);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Final Project");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
