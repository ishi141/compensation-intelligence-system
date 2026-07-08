import prisma from "../config/prisma";
import { ApiError } from "../utils/ApiError";
import { CompareRepository } from "../repositories/compare.repository";

export class CompareService {
  private repository = new CompareRepository();

  async compare(companyA: string, companyB: string) {
    const [a, b] = await Promise.all([
      prisma.company.findFirst({
        where: {
          normalizedName: companyA.toLowerCase(),
        },
      }),

      prisma.company.findFirst({
        where: {
          normalizedName: companyB.toLowerCase(),
        },
      }),
    ]);

    if (!a) {
      throw new ApiError(404, `${companyA} not found`);
    }

    if (!b) {
      throw new ApiError(404, `${companyB} not found`);
    }

    const result = await this.repository.compare(
      companyA,
      companyB
    );

    return {
      companyA: {
        id: a.id,
        name: a.name,
        ...result.companyA,
      },

      companyB: {
        id: b.id,
        name: b.name,
        ...result.companyB,
      },
    };
  }
}