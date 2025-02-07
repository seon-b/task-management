const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const passport = require("passport");

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (user === null)
          return done(null, false, { message: "user does not exist" });

        const matchFound = await bcrypt.compare(password, user.passwordHash);
        if (matchFound === false)
          return done(null, false, { message: "invalid password" });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user === null) return done(new Error("User does not exist"));

    done(null, user);
  } catch (error) {
    done(error);
  }
});

function validateUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = { passport, validateUser };
