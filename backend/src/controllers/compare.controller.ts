import { NextFunction, Request, Response } from "express";
import { CompareService } from "../services/compare.service";
import { ApiResponse } from "../utils/ApiResponse";

const service = new CompareService();

export class CompareController {
  async compare(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const companyA =
        typeof req.query.companyA === "string"
          ? req.query.companyA
          : "";

      const companyB =
        typeof req.query.companyB === "string"
          ? req.query.companyB
          : "";

      const result = await service.compare(
        companyA,
        companyB
      );

      return res.status(200).json(
        new ApiResponse(
          true,
          "Comparison fetched successfully",
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }
}