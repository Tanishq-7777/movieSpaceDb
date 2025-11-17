const express = require("express");
const History = require("../models/history");
const userAuth = require("../middlewares/userAuth");
const { isValidObjectId } = require("mongoose");
const userHistory = express.Router();

userHistory.post("/user/sendHistory", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      title,
      movieId,
      vote_average,
      release_date,
      trailerKey,
      poster_path,
      overview,
      genres,
    } = req.body;
    const isValidHistory = await History.findOne({ userId: _id, movieId });

    if (isValidHistory) {
      return res.status(200).send("History already exist");
    }
    const userMovieHistory = new History({
      userId: _id,
      movieId,
      title,
      vote_average,
      release_date,
      trailerKey,
      poster_path,
      overview,
      genres,
    });

    await userMovieHistory.save();
    return res.send("History Saved");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userHistory.get("/user/getHistory", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const data = await History.find({ userId: _id });
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userHistory;
