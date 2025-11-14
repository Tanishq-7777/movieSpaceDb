const express = require("express");
const { connectDb } = require("./config/database");
const cors = require("cors");
const authRouter = require("./routers/authRouter");
const cookieParser = require("cookie-parser");
const User = require("./models/user");
const userProfile = require("./routers/userProfile");
const app = express();
const PORT = 7777;
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, server-side)
      if (!origin) return callback(null, true);

      // Allow local development
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // ✅ Dynamically allow all your Vercel deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      // ❌ Block everything else
      console.log("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter);
app.use("/", userProfile);

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
