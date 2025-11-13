const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validations");
const userAuth = require("../middlewares/userAuth");
const jwt = require("jsonwebtoken");
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
    await validateSignUpData(req.body);
    await user.save();
    const token = await user.getJwt();
    res.cookie("token", token);
    res.status(200).send("Data Saved Successfully");
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});
authRouter.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid Credential");
    const hashedPassword = user.password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (isPasswordValid) {
      const token = await user.getJwt();
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Invalid Credential");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});
authRouter.post("/user/logout", userAuth, async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful");
});
module.exports = authRouter;
