import { z } from "zod";

export const levelSchema = z.object({
  name: z
    .string()
    .min(1, "Level name is required")
    .min(2, "Level name must be at least 2 characters"),
  index: z.coerce
    .number()
    .int("Index must be a whole number")
    .min(1, "Index must be at least 1"),
});

export type LevelFormValues = z.infer<typeof levelSchema>;
