import { registerAs } from "@nestjs/config";
import { z } from "zod";
import { validationSchema } from "./validation";

export type EnvConfig = z.infer<typeof validationSchema>;

export const configuration = registerAs("app", () => {
  const parsed = validationSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment configuration");
  }
  return parsed.data;
});
