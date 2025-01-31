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

router.put("/save-tasks", async (req, res) => {
  const { email, tasks } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser === null)
    return res.json({ error: "User does not exist" }).status(404);

  const updatedTasks = await prisma.user.update({
    where: { email: email },
    data: { tasks: tasks },
  });
  res.json(updatedTasks);
});
module.exports = router;
