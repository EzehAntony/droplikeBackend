const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookie_parser = require("cookie-parser");
const authRoute = require("./api/routes/auth");
const userRoute = require("./api/routes/users");
const noteRoute = require("./api/routes/notes");
const cors = require("cors");

mongoose
  .connect(process.env.url)
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookie_parser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/note", noteRoute);
app.listen(process.env.port || 5000 , () => {
  console.log("Backend server is now running");
});
