import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(401, "Unauthorized");
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Invalid token");
    }

    const token = authHeader.split(" ")[1];

    req.user = verifyToken(token);

    next();
  } catch (error) {
    next(error);
  }
};