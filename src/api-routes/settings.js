const express = require("express");
const router = express.Router();
const prisma = require("../../prisma/prisma-client");

router.get("/user-settings", async (req, res, next) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (user === null) return res.sendStatus(404);

  const settings = await prisma.settings.findUnique({
    where: { userEmail: email },
  });
  res.json(settings).statusCode(200);
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

  const updatedsettings = await prisma.settings.update({
    where: { userEmail: email },
    data: { settings: settings },
  });
  res.status(204);
});

module.exports = router;
