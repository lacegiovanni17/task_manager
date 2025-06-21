import { Router } from "express";
import authRoutes from "./auth/auth.routes";
import userRouter from "./users/user.routes";
import taskRouter from "./task/task.routes";
import {
  applyAuthRateLimit,
  applyTaskRateLimit,
} from "../middlewares/ratelimit.middleware";
// import { applyBookingRateLimit } from "../middlewares/ratelimit.middleware";

const router = Router();

// Register module routes
router.use("/auth", applyAuthRateLimit, authRoutes);
router.use("/users", applyAuthRateLimit, userRouter);
router.use("/tasks", applyTaskRateLimit, taskRouter);

export default router;
