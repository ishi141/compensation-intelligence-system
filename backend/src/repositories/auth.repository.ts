import prisma from "../config/prisma";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateUserDto) {
    return prisma.user.create({
      data,
    });
  }
}