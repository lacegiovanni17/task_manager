import { Request, Response, NextFunction } from "express";
import { taskService } from "./task.services";
import HttpException from "../../utils/exceptions/http.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";
import { UnauthorizedException } from "../../utils/exceptions/unauthorized.exception";

// Create Task
export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = (req as any).user?.user_id;
    const result = await taskService.createTask({ ...req.body, user_id });
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

// Get All Tasks
export async function getTasksbyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = (req as any).user?.user_id;
    if (!user_id) {
      throw new UnauthorizedException("User ID not found in request.");
    }
    const result = await taskService.getTasksByUser(user_id);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllTasks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await taskService.getAllTasks();
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

// Get Task by ID
export async function getTaskById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      throw new BadRequestsException("Task ID not found in request.");
    }
    const result = await taskService.getTaskById(taskId);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

// Update Task
export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = (req as any).user?.user_id;
    const taskId = req.params.id;
    if (!user_id) {
      throw new UnauthorizedException("User ID not found in request.");
    }
    if (!taskId) {
      throw new BadRequestsException("Task ID not found in request.");
    }
    const result = await taskService.updateTask(taskId, user_id, req.body);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

// Delete Task
export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user_id = (req as any).user?.user_id;
    const taskId = req.params.id;
    if (!user_id) {
      throw new UnauthorizedException("User ID not found in request.");
    }
    if (!taskId) {
      throw new BadRequestsException("Task ID not found in request.");
    }
    const result = await taskService.deleteTask(taskId, user_id);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}
