const { userSchema, newTaskSchema } = require("../zod/schema");

const formatErrorMessage = (errors) => {
  return errors.toString().split(",").join("");
};

const validateLogin = (data) => {
  return userSchema.safeParse({
    email: data.email,
    password: data.password,
  });
};

const validateNewTask = (data) => {
  return newTaskSchema.safeParse({
    content: data.content,
    title: data.title,
  });
};

const validateSignup = (data) => {
  return userSchema.safeParse({
    email: data.email,
    password: data.password,
  });
};

module.exports = {
  formatErrorMessage,
  validateLogin,
  validateNewTask,
  validateSignup,
};
