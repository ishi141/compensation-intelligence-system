import { NextFunction, Request, Response } from "express";
import { CompanyService } from "../services/company.service";
import { ApiResponse } from "../utils/ApiResponse";
import { createCompanySchema } from "../validators/company.validator";

const service = new CompanyService();

export class CompanyController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = createCompanySchema.parse(req.body);

      const company = await service.create(body);

      return res
        .status(201)
        .json(new ApiResponse(true, "Company created", company));
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);

      const companies = await service.getAll(page, limit);

      return res
        .status(200)
        .json(new ApiResponse(true, "Companies fetched", companies));
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const company = await service.getById(id);

      return res
        .status(200)
        .json(new ApiResponse(true, "Company fetched", company));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const body = createCompanySchema.parse(req.body);

      const company = await service.update(id, body);

      return res
        .status(200)
        .json(new ApiResponse(true, "Company updated", company));
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
        .json(new ApiResponse(true, "Company deleted"));
    } catch (error) {
      next(error);
    }
  }
}