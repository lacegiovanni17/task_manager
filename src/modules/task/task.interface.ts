import { Document, Types } from "mongoose";
import { TaskStatus } from "./task.enum";

export interface ITask extends Document {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
  user_id: Types.ObjectId; // To associate task with a user
}

export interface IAllTasksResponse {
  tasks: ITask[] | null;
  count: number | null;
}
