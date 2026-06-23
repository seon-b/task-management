const redirectToDashboard = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  } else {
    next();
  }
};
const redirectToRoot = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  } else {
    next();
  }
};

module.exports = { redirectToDashboard, redirectToRoot };
