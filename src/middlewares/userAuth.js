const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function userAuth(req, res, next) {
  try {
    const { token } = req.cookies;
    if (token) {
      const validToken = await jwt.verify(token, "MovieSpace2025");
      if (!validToken) throw new Error("Token is not valid");
      const { _id } = validToken;
      const user = await User.findOne({ _id });
      if (!user) throw new Error("User is not valid");
      req.user = user;
    }
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
}
module.exports = userAuth;
