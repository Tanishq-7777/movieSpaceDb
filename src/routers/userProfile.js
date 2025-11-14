const express = require("express");
const userAuth = require("../middlewares/userAuth");
const userProfile = express.Router();

userProfile.get("/user", userAuth, async (req, res) => {
  try {
    if (req.user) {
      res.json({
        data: req.user,
      });
    } else {
      throw new Error("Please Login");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userProfile;
