import { LevelRepository } from "../repositories/level.repository";
import { ApiError } from "../utils/ApiError";
import { CreateLevelDto } from "../validators/level.validator";

export class LevelService {
  private repository = new LevelRepository();

  async create(data: CreateLevelDto) {
    const existing = await this.repository.findByName(data.name);

    if (existing) {
      throw new ApiError(409, "Level already exists");
    }

    return this.repository.create(data);
  }

  async getAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [levels, total] = await Promise.all([
      this.repository.findAll(skip, limit),
      this.repository.count(),
    ]);

    return {
      levels,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    const level = await this.repository.findById(id);

    if (!level) {
      throw new ApiError(404, "Level not found");
    }

    return level;
  }

  async update(id: string, data: CreateLevelDto) {
    await this.getById(id);

    const duplicate = await this.repository.findByName(data.name);

    if (duplicate && duplicate.id !== id) {
      throw new ApiError(409, "Level already exists");
    }

    return this.repository.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);

    await this.repository.delete(id);
  }
}