const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/user-tasks", async (req, res, next) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user === null) return res.sendStatus(404);
  res.json(user).statusCode(200);
});

module.exports = router;
