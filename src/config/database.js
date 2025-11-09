const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://TanishqSaxena:tani2007@moviespace.mj2nkz4.mongodb.net/MoviesSpace"
  );
};
module.exports = {
  connectDb,
};
