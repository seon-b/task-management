const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const prisma = require("../../prisma/prisma-client");

router.post("/user-data", async (req, res) => {
  const { email } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser === null) {
    return res.json({ error: "User does not exist" }).status(404);
  } else {
    const { email, createdAt, updatedAt } = existingUser;

    let userObject = { email, createdAt, updatedAt };
    return res.json(userObject);
  }
});

router.post("/new-user", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser !== null)
    return res.json({ error: "User already exists" }).status(404);

  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      passwordHash: passwordHash,
    },
  });
  res.json(newUser.email).status(201);
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }

      res.json({ isLoggedOut: true });
    });
  });
});

module.exports = router;
