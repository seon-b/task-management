const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/tasks", async (req, res, next) => {
  const tasks = await prisma.user.findMany();
  res.json(tasks);
});

module.exports = router;
