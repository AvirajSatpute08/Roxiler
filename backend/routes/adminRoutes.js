const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const User = require("../models/User");
const Store = require("../models/Store");
const Rating = require("../models/Rating");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Middleware to check admin role
const adminAuth = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }
  next();
};

// Create a new store
router.post("/add-store", authMiddleware, adminAuth, async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    const store = await Store.create({ name, email, address, owner_id });
    res.json({ message: "Store added successfully", store });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add a new user (Admin/User/Store Owner)
router.post("/add-user", authMiddleware, adminAuth, async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, address, role });
    res.json({ message: "User added successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get dashboard stats
router.get("/dashboard", authMiddleware, adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all stores
router.get("/stores", authMiddleware, adminAuth, async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get("/users", authMiddleware, adminAuth, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
