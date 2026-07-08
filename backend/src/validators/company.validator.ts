import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().trim().min(2).max(100),

  website: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  logo: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),
});

export type CreateCompanyDto = z.infer<typeof createCompanySchema>;