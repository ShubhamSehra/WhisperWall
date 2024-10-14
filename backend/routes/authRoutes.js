const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

router.post(
  "/signup",
  [
    //Validate and samitize inputs
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({min: 6,}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      const newUser = new User({ name, email, password });
      const salt = await bcrypt.genSalt(8);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      res.status(201).json({ message: "user created successfully" });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ exists: true });
    }
    res.status(200).json({ exists: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
