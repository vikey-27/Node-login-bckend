const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginRoutes = require("./routes/login-route");
const signinRoutes = require("./routes/signin-route");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.post("/login", loginRoutes);
app.post("/signin", signinRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 505)
    .json({ message: error.message || "unknown error occured" });
});

mongoose
  .connect(
    "mongodb+srv://<username>:<password>@cluster0.zl7nk.mongodb.net/Login_authen?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(7000);
  })
  .catch((err) => {
    console.log(err);
  });


