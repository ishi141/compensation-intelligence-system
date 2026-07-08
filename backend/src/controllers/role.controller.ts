import { NextFunction, Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { ApiResponse } from "../utils/ApiResponse";
import { createRoleSchema } from "../validators/role.validator";

const service = new RoleService();

export class RoleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = createRoleSchema.parse(req.body);

      const role = await service.create(body);

      return res
        .status(201)
        .json(new ApiResponse(true, "Role created successfully", role));
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);

      const roles = await service.getAll(page, limit);

      return res
        .status(200)
        .json(new ApiResponse(true, "Roles fetched successfully", roles));
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const role = await service.getById(id);

      return res
        .status(200)
        .json(new ApiResponse(true, "Role fetched successfully", role));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const body = createRoleSchema.parse(req.body);

      const role = await service.update(id, body);

      return res
        .status(200)
        .json(new ApiResponse(true, "Role updated successfully", role));
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
        .json(new ApiResponse(true, "Role deleted successfully"));
    } catch (error) {
      next(error);
    }
  }
}