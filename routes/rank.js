const express = require("express");
const router = express.Router();

const Rank = require("../models/rank");

router.get("/", async (req, res) => {
  try {
    const { rank } = req.query;
    let filter = {};
    if (rank) {
      filter.rank = rank;
    }
    res.status(200).send(await Rank.find(filter));
  } catch (error) {
    res.status(400).send({ message: "Rank not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Rank.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Rank not Found" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newRank = new Rank({
      name: req.body.name,
      rank: req.body.rank,
      image: req.body.image,
    });
    await newRank.save();

    res.status(200).send(newRank);
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const rank_id = req.params.id;

    const updatedRank = await Rank.findByIdAndUpdate(rank_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedRank);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const rank_id = req.params.id;
    const deleteRank = await Rank.findByIdAndDelete(rank_id);
    res.status(200).send(deleteRank);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
