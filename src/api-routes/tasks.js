const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/prisma-client");

router.post("/user-tasks", async (req, res) => {
  const { email } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const existingUserTasks = await prisma.tasks.findUnique({
    where: { userEmail: email },
  });

  if (existingUser === null) {
    return res.json({ error: "User does not exist" }).status(404);
  } else {
    const { tasks } = existingUserTasks;

    if (tasks === null) return res.sendStatus(404);

    userTasksObject = tasks;
    return res.json(userTasksObject);
  }
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

  const updatedTasks = await prisma.tasks.upsert({
    where: { userEmail: email },
    update: { tasks: tasks },
    create: { tasks: tasks, userEmail: email },
    select: { tasks: true },
  });
  res.status(204);
});

module.exports = router;
