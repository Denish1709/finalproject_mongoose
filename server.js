const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
const port = 5000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

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
  .connect("mongodb://127.0.0.1:27017/valorantDB")
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// routes
const gunRouter = require("./routes/gun");
const rankRouter = require("./routes/rank");
const mapRouter = require("./routes/map");
const skinRouter = require("./routes/skin");
const imageRouter = require("./routes/image");
const agentRouter = require("./routes/agent");
const authRouter = require("./routes/auth");
// const mapRouter = require("./models/map");

// app.get("/", (req, res) => {
//   res.send("Final Project");
// });

app.use("/guns", gunRouter);
app.use("/ranks", rankRouter);
app.use("/skins", skinRouter);
app.use("/maps", mapRouter);
app.use("/agents", agentRouter);
app.use("/images", imageRouter);
app.use("/auth", authRouter);
// app.use("/maps", mapRouter);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Final Project");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
