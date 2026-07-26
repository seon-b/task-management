const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/prisma-client");

router.get("/user-tasks", async (req, res, next) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user === null) return res.sendStatus(404);

  const tasks = await prisma.tasks.findUnique({
    where: { email: email },
  });
  res.json(tasks).statusCode(200);
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

  const updatedTasks = await prisma.tasks.update({
    where: { userEmail: email },
    data: { tasks: tasks },
  });
  res.status(204);
});

module.exports = router;
