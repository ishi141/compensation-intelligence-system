import { RoleRepository } from "../repositories/role.repository";
import { ApiError } from "../utils/ApiError";
import { CreateRoleDto } from "../validators/role.validator";

export class RoleService {
  private repository = new RoleRepository();

  async create(data: CreateRoleDto) {
    const existing = await this.repository.findByTitle(data.title);

    if (existing) {
      throw new ApiError(409, "Role already exists");
    }

    return this.repository.create({
      title: data.title.trim(),
    });
  }

  async getAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [roles, total] = await Promise.all([
      this.repository.findAll(skip, limit),
      this.repository.count(),
    ]);

    return {
      roles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    const role = await this.repository.findById(id);

    if (!role) {
      throw new ApiError(404, "Role not found");
    }

    return role;
  }

  async update(id: string, data: CreateRoleDto) {
    await this.getById(id);

    const duplicate = await this.repository.findByTitle(data.title);

    if (duplicate && duplicate.id !== id) {
      throw new ApiError(409, "Role already exists");
    }

    return this.repository.update(id, data.title.trim());
  }

  async delete(id: string) {
    await this.getById(id);

    await this.repository.delete(id);
  }
}