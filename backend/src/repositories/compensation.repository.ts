import prisma from "../config/prisma";

export class CompensationRepository {
  async create(data: any) {
    return prisma.compensationRecord.create({
      data,
      include: {
        company: true,
        role: true,
        level: true,
        user: true,
      },
    });
  }

  async update(id: string, data: any) {
    return prisma.compensationRecord.update({
      where: { id },
      data,
      include: {
        company: true,
        role: true,
        level: true,
        user: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.compensationRecord.delete({
      where: { id },
    });
  }

  async findById(id: string) {
    return prisma.compensationRecord.findUnique({
      where: { id },
      include: {
        company: true,
        role: true,
        level: true,
        user: true,
      },
    });
  }

  async findAll(skip: number, take: number) {
    return prisma.compensationRecord.findMany({
      skip,
      take,
      include: {
        company: true,
        role: true,
        level: true,
        user: true,
      },
      orderBy: {
        totalCompensation: "desc",
      },
    });
  }

  async count() {
    return prisma.compensationRecord.count();
  }

  async findDuplicate(
    userId: string,
    companyId: string,
    roleId: string,
    levelId: string,
    location: string,
    yearsOfExperience: number
  ) {
    return prisma.compensationRecord.findFirst({
      where: {
        userId,
        companyId,
        roleId,
        levelId,
        location,
        yearsOfExperience,
      },
    });
  }
}