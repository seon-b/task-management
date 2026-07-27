const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const tasksRoute = require("./tasks");
const usersRoute = require("./users");
const settingsRoute = require("./settings");

router.use("/auth", authRoute);
router.use("/tasks", tasksRoute);
router.use("/users", usersRoute);
router.use("/settings", settingsRoute);

module.exports = router;
