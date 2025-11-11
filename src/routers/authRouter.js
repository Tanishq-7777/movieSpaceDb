const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validations");
//signup Api
authRouter.post("/user/signup", async (req, res) => {
  try {
    let { name, email, password } = req.body;
    //encrypt the Password
    const passwordHash = await bcrypt.hash(password, 10);
    password = passwordHash;
    const user = new User({
      name,
      email,
      password: passwordHash,
    });
    //validating name email and password
    validateSignUpData(req.body);
    user.save();
    const token = await user.getJwt();
    res.cookie("token", token);
    res.status(200).send("Data Saved Successfully");
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
authRouter.post("/user/login", userAuth, async (req, res) => {});

module.exports = authRouter;
