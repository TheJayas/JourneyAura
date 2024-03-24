const express = require("express");
const router = express.Router();

const {isAuthenticatedUser} = require("../Middleware/auth");

const {registerUser,loginUser,logout} = require("../Controllers/userController");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);