const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const usersRoute = require("./users");
const tasksRoute = require("./tasks");

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/tasks", tasksRoute);

module.exports = router;
