import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { AnalyticsRepository } from "../repositories/analytics.repository";

export class AnalyticsService {
  private repository = new AnalyticsRepository();

  async dashboard() {
    return this.repository.dashboard();
  }

  async company(companyId: string) {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    const analytics =
      await this.repository.companyAnalytics(companyId);

    return {
      company,
      analytics,
    };
  }

  async role(roleId: string) {
    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new ApiError(404, "Role not found");
    }

    const analytics =
      await this.repository.roleAnalytics(roleId);

    return {
      role,
      analytics,
    };
  }

  async level(levelId: string) {
    const level = await prisma.level.findUnique({
      where: {
        id: levelId,
      },
    });

    if (!level) {
      throw new ApiError(404, "Level not found");
    }

    const analytics =
      await this.repository.levelAnalytics(levelId);

    return {
      level,
      analytics,
    };
  }

  async location(location: string) {
    const analytics =
      await this.repository.locationAnalytics(location);

    return {
      location,
      analytics,
    };
  }

  async topCompanies(limit = 10) {
    return this.repository.topCompanies(limit);
  }
}