const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
const tasksRoute = require("./tasks");

router.use("/users", usersRoute);
router.use("/tasks", tasksRoute);

module.exports = router;
