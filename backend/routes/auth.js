const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET ;

/* =====================================================
   REGISTER
===================================================== */
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),

    body("email")
      .notEmpty().withMessage("Email is required")
      .isEmail().withMessage("Enter valid email")
      .custom(async (value) => {
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error("User already exists with this email");
        }
      }),

    body("password")
      .notEmpty().withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map(err => err.msg)
      );
    }

    const { name, email, password } = req.body;

    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });

    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* =====================================================
   LOGIN
===================================================== */
router.post(
  "/login",
  [
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(
        errors.array().map(err => err.msg)
      );
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          storiStage: user.storiStage,
        },
      });

    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* =====================================================
   VERIFY TOKEN MIDDLEWARE
===================================================== */
const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

/* =====================================================
   LOGOUT
===================================================== */
router.post("/logout", verifyToken, (req, res) => {
  res.json({ message: "Logout successful" });
});

module.exports = {
  router,
  verifyToken,
};
