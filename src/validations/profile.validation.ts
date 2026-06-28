import { z } from "zod";

export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "User name is required")
    .min(2, "User name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  address: z.string(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
