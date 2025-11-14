const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: "User registered" });
  } catch (err) {
    // This catches unique key violation (username already exists) or other DB errors
    res.status(400).json({ error: "Username already exists or invalid data" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    // Catches generic database/server errors
    res.status(500).json({ error: "Server error during login." });
  }
});

module.exports = router;