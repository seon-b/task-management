const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

module.exports = router;
