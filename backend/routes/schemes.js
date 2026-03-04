const express = require("express");
const router = express.Router();
const Scheme = require("../models/Scheme");

router.post("/add", async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ error: "Failed to add scheme" });
  }
});

router.get("/", async (req, res) => {
  const schemes = await Scheme.find();
  res.json(schemes);
});

router.post("/recommend", async (req, res) => {
  try {
    const { age, gender, state, occupation, income, category } = req.body;

    const schemes = await Scheme.find({
      minAge: { $lte: age },
      maxAge: { $gte: age },

      $and: [
        { $or: [{ gender: gender }, { gender: "Any" }] },
        { $or: [{ state: state }, { state: "All" }] },
        { $or: [{ occupation: occupation }, { occupation: "Any" }] },
        { $or: [{ casteCategory: category }, { casteCategory: "Any" }] }
      ],

      maxIncome: { $gte: income }
    });

    res.json(schemes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

module.exports = router;