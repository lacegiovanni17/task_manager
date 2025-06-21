import { Schema, model } from "mongoose";
import { ITask } from "./task.interface";
import { TaskStatus } from "./task.enum";

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Task = model<ITask>("Task", taskSchema);
export default Task;
