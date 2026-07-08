import { z } from "zod";

export const createCompensationSchema = z.object({
  companyId: z.string().cuid(),

  roleId: z.string().cuid(),

  levelId: z.string().cuid(),

  location: z.string().trim().min(2),

  yearsOfExperience: z.number().min(0).max(50),

  baseSalary: z.number().positive(),

  bonus: z.number().min(0).default(0),

  stock: z.number().min(0).default(0),

  currency: z
    .enum(["INR", "USD", "EUR", "GBP"])
    .default("INR"),
});

export type CreateCompensationDto = z.infer<
  typeof createCompensationSchema
>;