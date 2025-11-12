const express = require("express");
const { connectDb } = require("./config/database");
const authRouter = require("./routers/authRouter");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const app = express();
const PORT = 7777;
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);

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
