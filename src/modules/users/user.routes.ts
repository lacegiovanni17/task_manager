import { Router } from "express";
import {
  getUserProfile,
  findUserByEmail,
  getAllUsers,
  updateUserProfile,
  totalUsersCount,
} from "./user.controller";
import { authenticateUser } from "../../middlewares/auth.middleware";
import validationMiddleware from "../../middlewares/validation.middleware";
import { updateUserSchema } from "./user.validation";

const userRouter = Router();

// 🔐 Get logged-in user's profile
userRouter.get("/profile/:userId", authenticateUser, getUserProfile);

// 🔐 Find user by email
userRouter.get("/find-by-email", authenticateUser, findUserByEmail);

// 🔐 Update user profile
userRouter.put(
  "/update/:userId",
  authenticateUser,
  validationMiddleware(updateUserSchema),
  updateUserProfile
);

// 🔐 (Optional - Admin) Get all users
userRouter.get("/all", getAllUsers);

userRouter.get("/count-allusers", totalUsersCount);

export default userRouter;
