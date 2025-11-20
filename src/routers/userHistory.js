const express = require("express");
const History = require("../models/history");
const userAuth = require("../middlewares/userAuth");
const { isValidObjectId } = require("mongoose");
const MusicHistory = require("../models/musicHistory");
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
userHistory.delete(
  "/user/deleteHistory/:movieId",
  userAuth,
  async (req, res) => {
    try {
      const { _id } = req.user;
      const { movieId } = req.params;
      await History.findOneAndDelete({ userId: _id, movieId });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);
userHistory.post("/user/sendMusicHistory", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { author, title, thumbnail, videoId } = req.body;
    const isValidHistory = await MusicHistory.findOne({
      userId: _id,
      videoId,
    });
    if (isValidHistory) {
      return res.status(400).send("History Already Exist");
    }
    const music = new MusicHistory({
      userId: _id,
      author,
      title,
      thumbnail,
      videoId,
    });
    await music.save();
    res.send("History Saved");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
userHistory.get("/user/getMusicHistory", userAuth, async (req, res) => {
  try {
    const { _id } = req.user;
    const data = await MusicHistory.find({ userId: _id });
    res.status(200).json({
      message: "Music history fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
userHistory.delete(
  "/user/deleteMusicHistory/:videoId",
  userAuth,
  async (req, res) => {
    try {
      const { _id } = req.user;
      const { videoId } = req.params;
      await MusicHistory.findOneAndDelete({ userId: _id, videoId });
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

module.exports = userHistory;
