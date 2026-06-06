const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const tasksRoute = require("./tasks");
const pagesRoute = require("./pages");
const usersRoute = require("./users");

router.use("/auth", authRoute);
router.use("/tasks", tasksRoute);
router.use("/users", usersRoute);

module.exports = router;
