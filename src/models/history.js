const mongoose = require("mongoose");
const User = require("./user");
const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  movieId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  trailerKey: {
    type: String,
    required: false,
  },
  poster_path: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
  },
});
module.exports = mongoose.model("History", historySchema);
