import { Router } from "express";
import authRoutes from "./auth/auth.routes";
import userRouter from "./users/user.routes";
import taskRouter from "./task/task.routes";
// import { applyBookingRateLimit } from "../middlewares/ratelimit.middleware";

const router = Router();

// Register module routes
router.use("/auth", authRoutes);
router.use("/users", userRouter);
router.use("/tasks", taskRouter);

export default router;
