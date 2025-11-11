const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid.");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
userSchema.methods.getJwt = async () => {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "MovieSpace2025");
  return token;
};
module.exports = mongoose.model("User", userSchema);
