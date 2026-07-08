import prisma from "../config/prisma";

export interface CreateRoleRepositoryDto {
  title: string;
}

export class RoleRepository {
  async create(data: CreateRoleRepositoryDto) {
    return prisma.role.create({
      data,
    });
  }

  async findByTitle(title: string) {
    return prisma.role.findUnique({
      where: {
        title,
      },
    });
  }

  async findById(id: string) {
    return prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async findAll(skip: number, take: number) {
    return prisma.role.findMany({
      skip,
      take,
      orderBy: {
        title: "asc",
      },
    });
  }

  async count() {
    return prisma.role.count();
  }

  async update(id: string, title: string) {
    return prisma.role.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
  }

  async delete(id: string) {
    return prisma.role.delete({
      where: {
        id,
      },
    });
  }
}