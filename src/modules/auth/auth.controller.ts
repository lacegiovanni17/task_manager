import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.services";
import HttpException from "../../utils/exceptions/http.exception";

// Register User
export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await authService.registerUser(req.body);
    res.json(newUser);
  } catch (error: any) {
    next(new HttpException(error?.status, error.message));
  }
}

// Login User
export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const response = await authService.loginUser(email, password);
    res.json(response);
  } catch (error: any) {
    next(new HttpException(error?.status, error.message));
  }
}
