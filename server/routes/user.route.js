const express = require("express");
const UserController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);

module.exports = userRouter;
