import { CompanyRepository } from "../repositories/company.repository";
import { ApiError } from "../utils/ApiError";
import { CreateCompanyDto } from "../validators/company.validator";

export class CompanyService {
  private repository = new CompanyRepository();

  private normalize(name: string): string {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/inc\.?/g, "")
      .replace(/ltd\.?/g, "")
      .replace(/private/g, "")
      .trim();
  }

  async create(data: CreateCompanyDto) {
    const normalizedName = this.normalize(data.name);

    const existing = await this.repository.findByNormalizedName(
      normalizedName
    );

    if (existing) {
      throw new ApiError(409, "Company already exists");
    }

    return this.repository.create({
      ...data,
      normalizedName,
    });
  }

  async getAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [companies, total] = await Promise.all([
      this.repository.findAll(skip, limit),
      this.repository.count(),
    ]);

    return {
      companies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id: string) {
    const company = await this.repository.findById(id);

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    return company;
  }

  async update(id: string, data: CreateCompanyDto) {
    await this.getById(id);

    return this.repository.update(id, {
      ...data,
      normalizedName: this.normalize(data.name),
    });
  }

  async delete(id: string) {
    await this.getById(id);

    await this.repository.delete(id);
  }
}