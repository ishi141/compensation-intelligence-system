import prisma from "../config/prisma";

export interface CreateCompanyDto {
  name: string;
  normalizedName: string;
  website?: string;
  logo?: string;
}

export class CompanyRepository {
  async create(data: CreateCompanyDto) {
    return prisma.company.create({
      data,
    });
  }

  async findAll(skip: number, take: number) {
    return prisma.company.findMany({
      skip,
      take,
      orderBy: {
        name: "asc",
      },
    });
  }

  async count() {
    return prisma.company.count();
  }

  async findById(id: string) {
    return prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  async findByNormalizedName(normalizedName: string) {
    return prisma.company.findUnique({
      where: {
        normalizedName,
      },
    });
  }

  async update(id: string, data: Partial<CreateCompanyDto>) {
    return prisma.company.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.company.delete({
      where: {
        id,
      },
    });
  }
}