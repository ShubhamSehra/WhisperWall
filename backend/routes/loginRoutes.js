const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
router.post(
  "/login",
  [
    check("email", "please provide a valid email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User does not exist" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({ msg: "Incorrect passowrd" });
        
      }


      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user: {_id: user.id} });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error")
    }
  }
);

module.exports = router;
