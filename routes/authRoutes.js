const express = require("express");
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/auth");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/verify-token", verifyToken, (req, res) => {
  res.json({ message: "Token is valid." });
});

module.exports = router;
