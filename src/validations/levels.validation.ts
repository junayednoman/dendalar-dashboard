import { z } from "zod";

export const levelSchema = z.object({
  name: z
    .string()
    .min(1, "Level name is required")
    .min(2, "Level name must be at least 2 characters"),
});

export type LevelFormValues = z.infer<typeof levelSchema>;
