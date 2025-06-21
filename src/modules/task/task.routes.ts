import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getAllTasks,
  getTasksbyUser,
  updateTask,
} from "./task.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { createTaskSchema, updateTaskSchema } from "./task.validation";

const taskRouter = Router();

// Public Routes
taskRouter.get("/get-all-tasks", getAllTasks);
taskRouter.get("/all-user-tasks", authenticateUser, getTasksbyUser);
taskRouter.get("/get-task-by-id/:id", getTaskById);

// Protected Routes
taskRouter.post(
  "/createtask",
  authenticateUser,
  validationMiddleware(createTaskSchema),
  createTask
);
taskRouter.patch(
  "/updatetask/:id",
  authenticateUser,
  validationMiddleware(updateTaskSchema),
  updateTask
);
taskRouter.delete("/deletetask/:id", authenticateUser, deleteTask);

export default taskRouter;
