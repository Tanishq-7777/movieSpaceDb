const mongoose = require("mongoose");
const watchListScheema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
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
watchListScheema.index({ userId: 1, movieId: 1 }, { unique: true });
module.exports = mongoose.model("WatchList", watchListScheema);
