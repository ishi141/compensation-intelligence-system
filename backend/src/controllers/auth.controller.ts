import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { ApiResponse } from "../utils/ApiResponse";
import { loginSchema, registerSchema } from "../validators/auth.validator";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = registerSchema.parse(req.body);

      const result = await authService.register(body);

      return res.status(201).json(
        new ApiResponse(true, "User registered successfully", result)
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = loginSchema.parse(req.body);

      const result = await authService.login(body);

      return res
        .status(200)
        .json(new ApiResponse(true, "Login successful", result));
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.getCurrentUser(req.user!.id);

      return res
        .status(200)
        .json(new ApiResponse(true, "User fetched successfully", result));
    } catch (error) {
      next(error);
    }
  }
}