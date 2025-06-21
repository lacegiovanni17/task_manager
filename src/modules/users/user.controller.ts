import { Request, Response, NextFunction } from "express";
import { userService } from "./user.services";
import HttpException from "../../utils/exceptions/http.exception";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const result = await userService.getUserProfile(userId);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

export async function findUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.query;
    const result = await userService.findUserByEmail(email as string);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const result = await userService.updateUserProfile(userId, req.body);
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

export async function getAllUsers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.getAllUsers();
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}

export async function totalUsersCount(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await userService.totalUsersCount();
    res.json(result);
  } catch (error: any) {
    next(error);
  }
}
