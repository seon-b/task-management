const express = require("express");
const morgan = require("morgan");
const pg = require("pg");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
require("../src/auth-strategies/passportLocal");

const helmet = require("helmet");
const path = require("path");
const { validateUser } = require("../src/auth-strategies/passportLocal");
const { redirectToDashboard } = require("../lib/redirect-routes");
const app = express();

const pages = require("./page-routes/pages");
const apiRoutes = require("./api-routes");
const { user } = require("../prisma/prisma-client");

const pool = new pg.Pool({
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: parseInt(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
});

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: process.env.DATABASE_SESSION_TABLE_NAME,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", pages);
app.use("/api", apiRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.listen(PORT, () => {
  console.log(`Task Management App listening on port ${PORT}`);
  console.log("URL:", `http://localhost:${PORT}`);
});
