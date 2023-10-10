const express = require("express");
const router = express.Router();

const Agent = require("../models/agent");

router.get("/", async (req, res) => {
  try {
    const { role } = req.query;
    let filter = {};
    if (role) {
      filter.role = role;
    }
    res.status(200).send(await Agent.find(filter).sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: "Role not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Agent.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Agent not Found" });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newAgent = new Agent({
      name: req.body.name,
      description: req.body.description,
      basicAbilities: req.body.basicAbilities,
      signatureAbilities: req.body.signatureAbilities,
      ultimateAbilities: req.body.ultimateAbilities,
      role: req.body.role,
      image: req.body.image,
    });
    await newAgent.save();

    res.status(200).send(newAgent);
  } catch (error) {
    // console.log(error);
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const agent_id = req.params.id;

    const updatedAgent = await Agent.findByIdAndUpdate(agent_id, req.body, {
      new: true,
    });
    res.status(200).send(updatedAgent);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const agent_id = req.params.id;
    const deleteAgent = await Agent.findByIdAndDelete(agent_id);
    res.status(200).send(deleteAgent);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
