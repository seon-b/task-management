const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login-failed",
    failureMessage: true,
  })
);

module.exports = router;
