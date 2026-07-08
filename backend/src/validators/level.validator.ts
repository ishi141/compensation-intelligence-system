import { z } from "zod";

export const createLevelSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Level name is required")
    .max(50),

  rank: z
    .number()
    .int()
    .positive(),
});

export type CreateLevelDto = z.infer<typeof createLevelSchema>;