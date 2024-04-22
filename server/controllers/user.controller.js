const { UserModel } = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    try {
      const user = new UserModel(req.body);
      const newUser = await user.save();
      res.status(201);
      res.json({
        message: "New user created",
      });
    } catch (err) {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        console.log(err.errors);
        if (err.errors.userName) {
          res.status(409);
          res.json({
            error: err.errors.userName.properties.message,
          });
        }
        if (err.errors.password) {
          res.status(400);
          res.json({
            error: err.errors.password.properties.message,
          });
        }
        if (err.errors.firstName) {
          res.status(400);
          res.json({
            error: err.errors.firstName.properties.message,
          });
        }
        if (err.errors.lastName) {
          res.status(400);
          res.json({
            err: err.errors.lastName.properties.message,
          });
        }
      } else {
        res.status(500);
        res.json({ message: "Server error" });
      }
    }
  },
  login: async (req, res) => {
    try {
      const user = await UserModel.findOne({ userName: req.body.userName });
      if (user === null) {
        throw new Error("Username not found");
      }
      const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!correctPassword) {
        throw new Error("Incorrect password");
      }
      const payload = {
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      const userToken = jwt.sign(payload, process.env.SECRET_KEY);
      res.cookie("usertoken", userToken, {
        httpOnly: true,
      });
      res.status(200);
      res.json({
        message: "Successfully logged in",
        user: {
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (err) {
      res.status(401);
      res.json(err);
    }
  },
  logout: (req, res) => {
    res.clearCookie("usertoken");
    res.json({ message: "You have been logged out" });
  },
};
