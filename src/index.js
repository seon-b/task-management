require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
require("./auth-strategies/passportLocal");

const helmet = require("helmet");
const path = require("path");
const { validateUser } = require("./auth-strategies/passportLocal");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 120,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./routes"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.get("/", (req, res, next) => {
  res.render("index", { message: null });
});

app.get("/dashboard", validateUser, (req, res, next) => {
  res.render("dashboard", { profileName: req.user.email, message: null });
});

app.get("/login", (req, res, next) => {
  res.render("login", { message: null });
});

app.get("/login-failed", (req, res, next) => {
  res.render("login", { message: "Login Unsuccessful" });
});

app.listen(PORT, () => {
  console.log(`Task Management App listening on port ${PORT}`);
  console.log("URL:", `http://localhost:${PORT}`);
});
