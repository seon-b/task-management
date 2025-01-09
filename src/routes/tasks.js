const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/user-tasks", async (req, res, next) => {
  const { email } = req.body;
  const tasks = await prisma.user.findMany({
    where: { email: email },
  });
  res.json(tasks);
});

module.exports = router;
