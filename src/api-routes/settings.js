const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/prisma-client");

router.post("/user-settings", async (req, res, next) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user === null) return res.sendStatus(404);

  const settings = await prisma.settings.findUnique({
    where: { userEmail: email },
  });

  const settingsObject = settings.settings;
  return res.json(settingsObject).status(200);
});

router.put("/save-settings", async (req, res) => {
  const { email, settings } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser === null)
    return res.json({ error: "User does not exist" }).status(404);

  const updatedsettings = await prisma.settings.upsert({
    where: { userEmail: email },
    update: { settings: settings },
    create: { settings: settings, userEmail: email },
    select: { settings: true },
  });
  res.status(204);
});

module.exports = router;
