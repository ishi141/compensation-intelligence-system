import { NextFunction, Request, Response } from "express";
import { SearchService } from "../services/search.service";
import { ApiResponse } from "../utils/ApiResponse";

const service = new SearchService();

export class SearchController {
  async search(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await service.search({
        company:
          typeof req.query.company === "string"
            ? req.query.company
            : undefined,

        role:
          typeof req.query.role === "string"
            ? req.query.role
            : undefined,

        level:
          typeof req.query.level === "string"
            ? req.query.level
            : undefined,

        location:
          typeof req.query.location === "string"
            ? req.query.location
            : undefined,

        minExp:
          typeof req.query.minExp === "string"
            ? Number(req.query.minExp)
            : undefined,

        maxExp:
          typeof req.query.maxExp === "string"
            ? Number(req.query.maxExp)
            : undefined,

        sort:
          typeof req.query.sort === "string"
            ? req.query.sort
            : "tc",

        page:
          typeof req.query.page === "string"
            ? Number(req.query.page)
            : 1,

        limit:
          typeof req.query.limit === "string"
            ? Number(req.query.limit)
            : 10,
      });

      return res.status(200).json(
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
}