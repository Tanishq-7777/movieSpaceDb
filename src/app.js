const express = require("express");
const { connectDb } = require("./config/database");
const User = require("./models/user");
const app = express();
const PORT = 9999;

app.use("/", async (req, res) => {
  const user = new User({
    name: "tanishq",
    email: "saxenaat@gmail.com",
    password: "12345678",
  });
  await user.save();
  res.send("Checking Db");
});

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
