const redirectToDashboard = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  } else {
    next();
  }
};

module.exports = { redirectToDashboard };
