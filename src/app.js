const express = require("express");
const { connectDb } = require("./config/database");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const userProfile = require("./routers/userProfile");
const userHistory = require("./routers/userHistory");
const app = express();
const PORT = 7777;
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-project-movies-space.vercel.app", // your real frontend
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", userProfile);
app.use("/", userHistory);

connectDb()
  .then(() => {
    console.log("DB Connected 👌");
    app.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB CONNECTON FAILED");
  });
