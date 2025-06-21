import { Request, Response, NextFunction } from "express";
import {
  authRateLimiter,
  globalRateLimiter,
  taskRateLimiter,
} from "../config/ratelimit";

export const applyGlobalRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  globalRateLimiter(req, res, next);
};

// Middleware function to apply authentication rate limiting
export const applyAuthRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  authRateLimiter(req, res, next);
};

// Middleware function to apply booking rate limiting
export const applyTaskRateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  taskRateLimiter(req, res, next);
};
