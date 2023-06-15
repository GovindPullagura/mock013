const express = require("express");
const { UserModel } = require("../models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { email, password, username, avatar } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      res.send({ msg: "User exists." });
    } else {
      bcrypt.hash(password, 3, async (err, hash) => {
        let newUser = new UserModel({
          email,
          password: hash,
          username,
          avatar,
        });
        await newUser.save();
        res.send({ msg: "Registration Successful." });
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      res.send("User does not exist.");
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          var token = jwt.sign({ foo: "blog" }, "mock013");
          res.send({ msg: "Login Success", token, avatar: user.avatar });
        } else {
          res.send("Incorrect Password.");
        }
      });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = { userRouter };
