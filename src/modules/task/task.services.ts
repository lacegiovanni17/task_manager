import Task from "./task.model";
import { IAllTasksResponse, ITask } from "./task.interface";
import { IGenericResponseModel } from "../../utils/interfaces/generic_response.interface";
import UtilService from "../../utils/services/utils.service";
import { Types } from "mongoose";
import { NotFoundException } from "../../utils/exceptions/not_found.exception";
import { BadRequestsException } from "../../utils/exceptions/bad_request.exception";

class TaskService {
  private utilService = new UtilService();

  // Create Task
  public async createTask(
    taskData: ITask
  ): Promise<IGenericResponseModel<ITask>> {
    try {
      const newTask = new Task(taskData);
      await newTask.save();

      return this.utilService.buildApiResponse({
        data: newTask,
        message: "Task created successfully.",
        statusCode: 201,
        success: true,
      });
    } catch (error: any) {
      console.error("Error creatingg tasks:", error);
      throw error;
    }
  }

  // Get All Tasks for a User
  public async getTasksByUser(
    userId: string
  ): Promise<IGenericResponseModel<ITask[]>> {
    try {
      const tasks = await Task.find({ user_id: userId })
        .sort({ createdAt: -1 })
        .lean();
      console.log("checking tasks of user:", tasks);
      return this.utilService.buildApiResponse({
        data: tasks,
        message: "Tasks retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error getting tasks:", error);
      throw error;
    }
  }

  // Get Single Task by ID
  public async getTaskById(
    taskId: string
  ): Promise<IGenericResponseModel<ITask>> {
    try {
      if (!Types.ObjectId.isValid(taskId)) {
        throw new BadRequestsException("Invalid task ID");
      }

      const task = await Task.findOne({ _id: taskId }).lean();
      if (!task) throw new NotFoundException("Task not found");

      return this.utilService.buildApiResponse({
        data: task,
        message: "Task retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error getting task by id:", error);
      throw error;
    }
  }

  // Update Task
  public async updateTask(
    taskId: string,
    userId: string,
    updateData: Partial<ITask>
  ): Promise<IGenericResponseModel<ITask>> {
    try {
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, user_id: userId },
        updateData,
        { new: true }
      ).lean();

      if (!updatedTask) throw new NotFoundException("Task not found");

      return this.utilService.buildApiResponse({
        data: updatedTask,
        message: "Task updated successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error updating task:", error);
      throw error;
    }
  }

  // Delete Task
  public async deleteTask(
    taskId: string,
    userId: string
  ): Promise<IGenericResponseModel<null>> {
    try {
      const result = await Task.findOneAndDelete({
        _id: taskId,
        user_id: userId,
      });

      if (!result) throw new NotFoundException("Task not found");

      return this.utilService.buildApiResponse({
        data: null,
        message: "Task deleted successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error: any) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  public async getAllTasks(): Promise<
    IGenericResponseModel<IAllTasksResponse>
  > {
    try {
      const tasks = await Task.find().sort({ createdAt: -1 }).lean();
      const count = await Task.countDocuments();

      return this.utilService.buildApiResponse<IAllTasksResponse>({
        data: {
          tasks,
          count,
        },
        message: "All tasks retrieved successfully.",
        statusCode: 200,
        success: true,
      });
    } catch (error) {
      console.error("Error retrieving all tasks:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();
