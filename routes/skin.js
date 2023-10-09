const express = require("express");
const router = express.Router();

const Skin = require("../models/skin");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let filter = {};
    if (name) {
      filter.name = name;
    }
    res.status(200).send(await Skin.find(filter).sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: "Name not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Skin.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Skin not Found" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newSkin = new Skin({
      name: req.body.name,
      mainImg: req.body.mainImg,
      image1: req.body.image1,
      image1: req.body.image1,
      image2: req.body.image2,
      image3: req.body.image3,
      image4: req.body.image4,
      image5: req.body.image5,
    });
    await newSkin.save();

    res.status(200).send(newSkin);
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const skin_id = req.params.id;

    const updatedSkin = await Skin.findByIdAndUpdate(skin_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedSkin);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const skin_id = req.params.id;
    const deleteSkin = await Skin.findByIdAndDelete(skin_id);
    res.status(200).send(deleteSkin);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
