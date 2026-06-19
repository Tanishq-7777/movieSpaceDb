const mongoose = require("mongoose");

const connectDb = async () => {
  console.log(process.env.MONGO_URI);
  return await mongoose.connect(process.env.MONGO_URI);
};

module.exports = { connectDb };
