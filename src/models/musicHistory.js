const mongoose = require("mongoose");
const musicHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  author: {
    type: String,
    thumbnail: String,
  },
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  videoId: {
    type: String,
  },
});
module.exports = mongoose.model("MusicHistory", musicHistorySchema);
