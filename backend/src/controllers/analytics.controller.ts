import { NextFunction, Request, Response } from "express";
import { AnalyticsService } from "../services/analytics.service";
import { ApiResponse } from "../utils/ApiResponse";

const service = new AnalyticsService();

export class AnalyticsController {
  async dashboard(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await service.dashboard();

      return res.status(200).json(
        new ApiResponse(
          true,
          "Dashboard analytics fetched successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async company(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const result = await service.company(id);

      return res.status(200).json(
        new ApiResponse(
          true,
          "Company analytics fetched successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async role(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const result = await service.role(id);

      return res.status(200).json(
        new ApiResponse(
          true,
          "Role analytics fetched successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async level(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const result = await service.level(id);

      return res.status(200).json(
        new ApiResponse(
          true,
          "Level analytics fetched successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async location(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const location = Array.isArray(req.params.location)
        ? req.params.location[0]
        : req.params.location;

      const result = await service.location(location);

      return res.status(200).json(
        new ApiResponse(
          true,
          "Location analytics fetched successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async topCompanies(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const limit = Number(req.query.limit ?? 10);

      const result = await service.topCompanies(limit);

      return res.status(200).json(
        new ApiResponse(
          true,
          "Top companies fetched successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }
}