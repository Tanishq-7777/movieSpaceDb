const mongoose = require("mongoose");
const watchListScheema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  movieId: {
    type: Number,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },

  vote_average: {
    type: Number,
  },

  release_date: {
    type: String,
  },

  trailerKey: {
    type: String,
  },

  poster_path: {
    type: String,
  },

  overview: {
    type: String,
  },
});
module.exports = mongoose.model("WatchList", watchListScheema);
