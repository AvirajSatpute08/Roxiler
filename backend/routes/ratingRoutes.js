const express = require("express");
const Rating = require("../models/Rating");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Submit or Update a rating
router.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const existingRating = await Rating.findOne({ where: { user_id: req.user.id, store_id } });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      return res.json({ message: "Rating updated successfully" });
    }

    await Rating.create({ user_id: req.user.id, store_id, rating });
    res.json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get store ratings
router.get("/:store_id", async (req, res) => {
  try {
    const storeRatings = await Rating.findAll({ where: { store_id: req.params.store_id } });
    res.json(storeRatings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
