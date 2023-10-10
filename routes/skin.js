const express = require("express");
const router = express.Router();

const Skin = require("../models/skin");

const isAdminMiddleware = require("../middleware/isAdmin");

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
    console.log(error);
    res.status(400).send({ message: "Skin not Found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    console.log(req.body);
    const newSkin = new Skin({
      skinName: req.body.skinName,
      bundlePrice: req.body.bundlePrice,
      gunPrice: req.body.gunPrice,
      meleePrice: req.body.meleePrice,
      image1: req.body.image1,
      gunName2: req.body.gunName2,
      image2: req.body.image2,
      gunName3: req.body.gunName3,
      image3: req.body.image3,
      gunName4: req.body.gunName4,
      image4: req.body.image4,
      gunName5: req.body.gunName5,
      image5: req.body.image5,
    });
    await newSkin.save();

    res.status(200).send(newSkin);
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
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

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const skin_id = req.params.id;
    const deleteSkin = await Skin.findByIdAndDelete(skin_id);
    res.status(200).send(deleteSkin);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
