import { Router } from "express";
import { registerUser, loginUser } from "./auth.controller";
import validationMiddleware from "../../middlewares/validation.middleware";
import { registerValidationSchema, loginValidationSchema } from "./auth.validation";

const authRoutes = Router();

authRoutes.post("/register",validationMiddleware(registerValidationSchema), registerUser);
authRoutes.post("/login", validationMiddleware(loginValidationSchema), loginUser);

export default authRoutes;
