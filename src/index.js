const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
require("../src/auth-strategies/passportLocal");

const helmet = require("helmet");
const path = require("path");
const { validateUser } = require("../src/auth-strategies/passportLocal");
const { redirectToDashboard } = require("../lib/redirect-routes");
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
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./page-routes"));
app.use("/api", require("./api-routes"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.listen(PORT, () => {
  console.log(`Task Management App listening on port ${PORT}`);
  console.log("URL:", `http://localhost:${PORT}`);
});
