const mongoose = require("mongoose");

const connectDb = async () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

module.exports = { connectDb };
