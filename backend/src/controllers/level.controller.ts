import { NextFunction, Request, Response } from "express";
import { LevelService } from "../services/level.service";
import { ApiResponse } from "../utils/ApiResponse";
import { createLevelSchema } from "../validators/level.validator";

const service = new LevelService();

export class LevelController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = createLevelSchema.parse(req.body);

      const level = await service.create(body);

      return res
        .status(201)
        .json(new ApiResponse(true, "Level created successfully", level));
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);

      const levels = await service.getAll(page, limit);

      return res
        .status(200)
        .json(new ApiResponse(true, "Levels fetched successfully", levels));
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const level = await service.getById(id);

      return res
        .status(200)
        .json(new ApiResponse(true, "Level fetched successfully", level));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const body = createLevelSchema.parse(req.body);

      const level = await service.update(id, body);

      return res
        .status(200)
        .json(new ApiResponse(true, "Level updated successfully", level));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      await service.delete(id);

      return res
        .status(200)
        .json(new ApiResponse(true, "Level deleted successfully"));
    } catch (error) {
      next(error);
    }
  }
}