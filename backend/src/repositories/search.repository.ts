import prisma from "../config/prisma";

export interface SearchFilters {
  company?: string;
  role?: string;
  level?: string;
  location?: string;
  minExp?: number;
  maxExp?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export class SearchRepository {
  async search(filters: SearchFilters) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filters.location) {
      where.location = {
        contains: filters.location,
        mode: "insensitive",
      };
    }

    if (filters.minExp !== undefined || filters.maxExp !== undefined) {
      where.yearsOfExperience = {};

      if (filters.minExp !== undefined)
        where.yearsOfExperience.gte = filters.minExp;

      if (filters.maxExp !== undefined)
        where.yearsOfExperience.lte = filters.maxExp;
    }

    if (filters.company) {
      where.company = {
        normalizedName: {
          contains: filters.company.toLowerCase(),
        },
      };
    }

    if (filters.role) {
      where.role = {
        title: {
          contains: filters.role,
          mode: "insensitive",
        },
      };
    }

    if (filters.level) {
      where.level = {
        name: {
          contains: filters.level,
          mode: "insensitive",
        },
      };
    }

    const orderBy: any = {};

    switch (filters.sort) {
      case "base":
        orderBy.baseSalary = "desc";
        break;

      case "bonus":
        orderBy.bonus = "desc";
        break;

      case "stock":
        orderBy.stock = "desc";
        break;

      case "experience":
        orderBy.yearsOfExperience = "desc";
        break;

      default:
        orderBy.totalCompensation = "desc";
    }

    const [records, total] = await Promise.all([
      prisma.compensationRecord.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          company: true,
          role: true,
          level: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),

      prisma.compensationRecord.count({
        where,
      }),
    ]);

    return {
      records,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}