import * as z from "zod";

const userSchema = z.object({
  email: z.email({ message: "Invalid email address format" }),
  password: z
    .string()
    .min(8, { message: "Invalid password format" })
    .max(16, { message: "Invalid password format" }),
});

const newTaskSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Input field cannot be empty" })
    .max(100, { message: "Input too long" }),
  title: z
    .string()
    .min(1, { message: "Input field cannot be empty" })
    .max(100, { message: "Input too long" }),
});

module.exports = {
  userSchema,
  newTaskSchema,
};
