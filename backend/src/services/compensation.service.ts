import { CompensationRepository } from "../repositories/compensation.repository";
import { ApiError } from "../utils/ApiError";
import { CreateCompensationDto } from "../validators/compensation.validator";
import prisma from "../config/prisma";

export class CompensationService {
  private repository = new CompensationRepository();

  async create(userId: string, dto: CreateCompensationDto) {
    const company = await prisma.company.findUnique({
      where: { id: dto.companyId },
    });

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    const role = await prisma.role.findUnique({
      where: { id: dto.roleId },
    });

    if (!role) {
      throw new ApiError(404, "Role not found");
    }

    const level = await prisma.level.findUnique({
      where: { id: dto.levelId },
    });

    if (!level) {
      throw new ApiError(404, "Level not found");
    }

    const duplicate = await this.repository.findDuplicate(
      userId,
      dto.companyId,
      dto.roleId,
      dto.levelId,
      dto.location,
      dto.yearsOfExperience
    );

    if (duplicate) {
      throw new ApiError(
        409,
        "Compensation record already exists"
      );
    }

    const totalCompensation =
      dto.baseSalary +
      dto.bonus +
      dto.stock;

    const data = {
      location: dto.location,
      yearsOfExperience: dto.yearsOfExperience,
      baseSalary: dto.baseSalary,
      bonus: dto.bonus,
      stock: dto.stock,
      totalCompensation,
      currency: dto.currency,

      user: {
        connect: {
          id: userId,
        },
      },

      company: {
        connect: {
          id: dto.companyId,
        },
      },

      role: {
        connect: {
          id: dto.roleId,
        },
      },

      level: {
        connect: {
          id: dto.levelId,
        },
      },
    };

    return this.repository.create(data);
  }

  async getAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      this.repository.findAll(skip, limit),
      this.repository.count(),
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

  async getById(id: string) {
    const record = await this.repository.findById(id);

    if (!record) {
      throw new ApiError(
        404,
        "Compensation record not found"
      );
    }

    return record;
  }

  async update(
    id: string,
    dto: CreateCompensationDto
  ) {
    await this.getById(id);

    const totalCompensation =
      dto.baseSalary +
      dto.bonus +
      dto.stock;

    return this.repository.update(id, {
      location: dto.location,
      yearsOfExperience: dto.yearsOfExperience,
      baseSalary: dto.baseSalary,
      bonus: dto.bonus,
      stock: dto.stock,
      totalCompensation,
      currency: dto.currency,

      company: {
        connect: {
          id: dto.companyId,
        },
      },

      role: {
        connect: {
          id: dto.roleId,
        },
      },

      level: {
        connect: {
          id: dto.levelId,
        },
      },
    });
  }

  async delete(id: string) {
    await this.getById(id);

    await this.repository.delete(id);
  }
}