import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/auth.repository";
import { ApiError } from "../utils/ApiError";
import { generateToken } from "../utils/jwt";
import { LoginDto, RegisterDto } from "../validators/auth.validator";

export class AuthService {
  private repository = new AuthRepository();

  async register(data: RegisterDto) {
    const existing = await this.repository.findByEmail(data.email);

    if (existing) {
      throw new ApiError(409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.repository.create({
      ...data,
      password: hashedPassword,
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async login(data: LoginDto) {
    const user = await this.repository.findByEmail(data.email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const matched = await bcrypt.compare(data.password, user.password);

    if (!matched) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async getCurrentUser(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}