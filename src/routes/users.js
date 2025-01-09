const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/new-user", async (req, res) => {
  const { email, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
  res.json(newUser);
});

module.exports = router;
