import prisma from "../config/prisma";

export class CompareRepository {
  async compare(companyA: string, companyB: string) {
    const [first, second] = await Promise.all([
      prisma.compensationRecord.aggregate({
        where: {
          company: {
            normalizedName: companyA.toLowerCase(),
          },
        },
        _count: true,
        _avg: {
          baseSalary: true,
          bonus: true,
          stock: true,
          totalCompensation: true,
        },
        _max: {
          totalCompensation: true,
        },
      }),

      prisma.compensationRecord.aggregate({
        where: {
          company: {
            normalizedName: companyB.toLowerCase(),
          },
        },
        _count: true,
        _avg: {
          baseSalary: true,
          bonus: true,
          stock: true,
          totalCompensation: true,
        },
        _max: {
          totalCompensation: true,
        },
      }),
    ]);

    return {
      companyA: first,
      companyB: second,
    };
  }
}