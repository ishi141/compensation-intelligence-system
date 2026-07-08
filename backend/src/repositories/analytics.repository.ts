import prisma from "../config/prisma";

export class AnalyticsRepository {
  async dashboard() {
    const [
      totalCompanies,
      totalRoles,
      totalLevels,
      totalUsers,
      totalCompensations,
      aggregate,
    ] = await Promise.all([
      prisma.company.count(),
      prisma.role.count(),
      prisma.level.count(),
      prisma.user.count(),
      prisma.compensationRecord.count(),
      prisma.compensationRecord.aggregate({
        _avg: {
          baseSalary: true,
          bonus: true,
          stock: true,
          totalCompensation: true,
        },
        _max: {
          totalCompensation: true,
        },
        _min: {
          totalCompensation: true,
        },
      }),
    ]);

    return {
      totalCompanies,
      totalRoles,
      totalLevels,
      totalUsers,
      totalCompensations,

      averageBaseSalary: aggregate._avg.baseSalary ?? 0,
      averageBonus: aggregate._avg.bonus ?? 0,
      averageStock: aggregate._avg.stock ?? 0,
      averageTotalCompensation:
        aggregate._avg.totalCompensation ?? 0,

      highestCompensation:
        aggregate._max.totalCompensation ?? 0,

      lowestCompensation:
        aggregate._min.totalCompensation ?? 0,
    };
  }

  async companyAnalytics(companyId: string) {
    return prisma.compensationRecord.aggregate({
      where: {
        companyId,
      },

      _avg: {
        baseSalary: true,
        bonus: true,
        stock: true,
        totalCompensation: true,
      },

      _max: {
        totalCompensation: true,
      },

      _count: true,
    });
  }

  async roleAnalytics(roleId: string) {
    return prisma.compensationRecord.aggregate({
      where: {
        roleId,
      },

      _avg: {
        totalCompensation: true,
      },

      _max: {
        totalCompensation: true,
      },

      _count: true,
    });
  }

  async levelAnalytics(levelId: string) {
    return prisma.compensationRecord.aggregate({
      where: {
        levelId,
      },

      _avg: {
        totalCompensation: true,
      },

      _max: {
        totalCompensation: true,
      },

      _count: true,
    });
  }

  async locationAnalytics(location: string) {
    return prisma.compensationRecord.aggregate({
      where: {
        location,
      },

      _avg: {
        totalCompensation: true,
      },

      _max: {
        totalCompensation: true,
      },

      _count: true,
    });
  }

  async topCompanies(limit: number) {
    return prisma.company.findMany({
      include: {
        compensationRecords: {
          select: {
            totalCompensation: true,
          },
        },
      },

      take: limit,
    });
  }
}