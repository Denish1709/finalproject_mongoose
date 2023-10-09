const express = require("express");
const router = express.Router();

const Map = require("../models/map");

router.get("/", async (req, res) => {
  try {
    const { Name } = req.query;
    let filter = {};
    if (Name) {
      filter.Name = Name;
    }
    res.status(200).send(await Map.find(filter));
  } catch (error) {
    res.status(400).send({ message: "Map name not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Map.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Map not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newMap = new Map({
      name: req.body.name,
      image: req.body.image,
    });
    await newMap.save();

    res.status(200).send(newMap);
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const map_id = req.params.id;

    const updatedMap = await Map.findByIdAndUpdate(map_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedMap);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const map_id = req.params.id;
    const deleteMap = await Map.findByIdAndDelete(map_id);
    res.status(200).send(deleteMap);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
