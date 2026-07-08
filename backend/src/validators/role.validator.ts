import { z } from "zod";

export const createRoleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Role title is required")
    .max(100),
});

export type CreateRoleDto = z.infer<typeof createRoleSchema>;