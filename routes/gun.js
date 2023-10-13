const express = require("express");
const router = express.Router();

const Gun = require("../models/gun");

const isAdminMiddleware = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    res.status(200).send(await Gun.find(filter));
  } catch (error) {
    res.status(400).send({ message: "Gun not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Gun.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Gun not found" });
  }
});

router.post("/", isAdminMiddleware, async (req, res) => {
  try {
    const newGun = new Gun({
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
    });
    await newGun.save();
    res.status(200).send(newGun);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const gun_id = req.params.id;

    const updatedGun = await Gun.findByIdAndUpdate(gun_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedGun);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdminMiddleware, async (req, res) => {
  try {
    const gun_id = req.params.id;
    const deletePro = await Gun.findByIdAndDelete(gun_id);
    res.status(200).send(deletePro);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
