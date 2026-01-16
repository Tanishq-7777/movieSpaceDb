require("dotenv").config();
const express = require("express");
const { connectDb } = require("./config/database");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const userProfile = require("./routers/userProfile");
const userHistory = require("./routers/userHistory");
const userWatchList = require("./routers/userWatchList");
const app = express();
const http = require("http");
const initializeSocket = require("./utils/socket");
const server = http.createServer(app);
const PORT = process.env.PORT || 7777;
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-project-movies-space.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", userProfile);
app.use("/", userHistory);
app.use("/", userWatchList);
initializeSocket(server);
connectDb()
  .then(() => {
    console.log("DB Connected👌");
    server.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB CONNECTON FAILED");
  });
