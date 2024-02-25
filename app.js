const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/secret12");
const trySchema = new mongoose.Schema({
  email: String,
  password: String,
});
const item = mongoose.model("second", trySchema);

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/register", (req, res) => {
  const newUser = new item({
    email: req.body.username,
    password: req.body.password,
  });
  newUser.save();
  res.render("secrets");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  item.findOne({ email: username })
    .then(function (foundUser) {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        } else {
          res.send("Incorrect password.");
        }
      } else {
        res.send("User not found.");
      }
    })
    .catch(function (err) {
      console.log(err);
      res.send("An error occurred.");
    });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.listen(8000, function () {
  console.log("Server is running 0n 8000");
});