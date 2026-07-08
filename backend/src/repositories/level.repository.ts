import prisma from "../config/prisma";

export interface CreateLevelRepositoryDto {
  name: string;
  rank: number;
}

export class LevelRepository {
  async create(data: CreateLevelRepositoryDto) {
    return prisma.level.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.level.findUnique({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    return prisma.level.findUnique({
      where: {
        name,
      },
    });
  }

  async findAll(skip: number, take: number) {
    return prisma.level.findMany({
      skip,
      take,
      orderBy: {
        rank: "asc",
      },
    });
  }

  async count() {
    return prisma.level.count();
  }

  async update(id: string, data: CreateLevelRepositoryDto) {
    return prisma.level.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.level.delete({
      where: {
        id,
      },
    });
  }
}