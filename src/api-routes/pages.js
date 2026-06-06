const express = require("express");
const router = express.Router();
const { redirectToDashboard } = require("../../lib/redirect-routes");

router.get("/", redirectToDashboard, (req, res, next) => {
  res.render("index", { message: null });
});

router.get("/dashboard", redirectToDashboard, (req, res, next) => {
  res.render("dashboard", { profileName: req.user.email, message: null });
});

router.get("/login", (req, res, next) => {
  res.render("login", { message: null });
});

router.get("/login-failed", (req, res, next) => {
  res.render("login", { message: "Login Unsuccessful" });
});

module.exports = router;
