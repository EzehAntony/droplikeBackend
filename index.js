const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookie_parser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const cors = require("cors");

mongoose
  .connect(process.env.url)
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  res.header("Allow-control-Allow-Origin", "*");
  res.header(
    "Allow-Control-Allow-Headers",
    "origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://droplike.herokuapp.com",
      "https://droplikebackend.herokuapp.com",
    ],
    sameSite: "none",
  })
);
app.use(cookie_parser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is now running");
});
