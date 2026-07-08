import { NextFunction, Request, Response } from "express";
import { CompensationService } from "../services/compensation.service";
import { ApiResponse } from "../utils/ApiResponse";
import { createCompensationSchema } from "../validators/compensation.validator";

const service = new CompensationService();

export class CompensationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = createCompensationSchema.parse(req.body);

      const result = await service.create(req.user!.id, body);

      return res
        .status(201)
        .json(
          new ApiResponse(
            true,
            "Compensation created successfully",
            result
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);

      const result = await service.getAll(page, limit);

      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            "Compensation records fetched successfully",
            result
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const result = await service.getById(id);

      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            "Compensation record fetched successfully",
            result
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const body = createCompensationSchema.parse(req.body);

      const result = await service.update(id, body);

      return res
        .status(200)
        .json(
          new ApiResponse(
            true,
            "Compensation updated successfully",
            result
          )
        );
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
        .json(
          new ApiResponse(
            true,
            "Compensation deleted successfully"
          )
        );
    } catch (error) {
      next(error);
    }
  }
}