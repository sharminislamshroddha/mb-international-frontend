import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .url()
    .default("http://localhost:5001/api/v1"),

  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string().optional(),

  NEXT_PUBLIC_FACEBOOK_APP_ID: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_FACEBOOK_APP_ID:
    process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
});
