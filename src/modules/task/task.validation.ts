import Joi from "joi";
import { TaskStatus } from "./task.enum";

export const createTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().optional(),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional()
    .messages({
      "any.only": `Status must be one of: ${Object.values(TaskStatus).join(
        ", "
      )}`,
    }),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  status: Joi.string()
    .valid(...Object.values(TaskStatus))
    .optional()
    .messages({
      "any.only": `Status must be one of: ${Object.values(TaskStatus).join(
        ", "
      )}`,
    }),
});
