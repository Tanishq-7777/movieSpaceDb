const express = require("express");
const userAuth = require("../middlewares/userAuth");
const WatchList = require("../models/watchlist");
const userWatchList = express.Router();

userWatchList.post("/user/sendWatchList", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      movieId,
      title,
      vote_average,
      release_date,
      trailerKey,
      poster_path,
      overview,
    } = req.body;
    const isValidList = await WatchList.findOne({ userId: _id, movieId });
    if (isValidList) {
      return res.status(400).send("Already in WatchList");
    }
    const data = new WatchList({
      userId: _id,
      movieId,
      title,
      vote_average,
      release_date,
      trailerKey,
      poster_path,
      overview,
    });
    await data.save();
    res.send("User WatchList Updated");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
userWatchList.get("/user/getWatchList", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const data = await WatchList.find({ userId: _id });
    res.json({
      data: data,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
userWatchList.delete(
  "/user/removeWatchList/:movieId",
  userAuth,
  async (req, res) => {
    try {
      const { _id } = req.user;
      const { movieId } = req.params;
      const deleted = await WatchList.findOneAndDelete({
        userId: _id,
        movieId,
      });
      if (!deleted) {
        return res.status(404).send("Movie not found in WatchList");
      }
      return res.json({
        message: "Removed from WatchList",
        deleted,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = userWatchList;
