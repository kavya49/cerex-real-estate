"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
exports.validationSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.coerce.number().default(3000),
    API_PREFIX: zod_1.z.string().default("api/v1"),
    DATABASE_URL: zod_1.z.string().url(),
    REDIS_HOST: zod_1.z.string().default("localhost"),
    REDIS_PORT: zod_1.z.coerce.number().default(6379),
    REDIS_PASSWORD: zod_1.z.string().optional(),
    REDIS_DB: zod_1.z.coerce.number().default(0),
    JWT_SECRET: zod_1.z.string().min(32),
    JWT_EXPIRES_IN: zod_1.z.string().default("15m"),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32),
    JWT_REFRESH_EXPIRES_IN: zod_1.z.string().default("7d"),
    CORS_ORIGIN: zod_1.z
        .string()
        .default("http://localhost:5173,http://localhost:3000"),
    SWAGGER_TITLE: zod_1.z.string().default("Cerex Platform API"),
    SWAGGER_DESCRIPTION: zod_1.z
        .string()
        .default("Production-grade multi-tenant PropTech SaaS platform API"),
    SWAGGER_VERSION: zod_1.z.string().default("1.0.0"),
    SWAGGER_PATH: zod_1.z.string().default("docs"),
    THROTTLE_TTL: zod_1.z.coerce.number().default(60),
    THROTTLE_LIMIT: zod_1.z.coerce.number().default(100),
    LOG_LEVEL: zod_1.z
        .enum(["fatal", "error", "warn", "info", "debug", "trace"])
        .default("debug"),
    LOG_PRETTY: zod_1.z.string().default("true"),
    R2_ACCOUNT_ID: zod_1.z.string().optional(),
    R2_ACCESS_KEY_ID: zod_1.z.string().optional(),
    R2_SECRET_ACCESS_KEY: zod_1.z.string().optional(),
    R2_BUCKET_NAME: zod_1.z.string().optional(),
    R2_PUBLIC_URL: zod_1.z.string().optional(),
    WHATSAPP_PHONE_NUMBER_ID: zod_1.z.string().optional(),
    WHATSAPP_ACCESS_TOKEN: zod_1.z.string().optional(),
    WHATSAPP_WEBHOOK_VERIFY_TOKEN: zod_1.z.string().optional(),
    WHATSAPP_API_VERSION: zod_1.z.string().default("v18.0"),
    OPENAI_API_KEY: zod_1.z.string().optional(),
    SMTP_HOST: zod_1.z.string().optional(),
    SMTP_PORT: zod_1.z.coerce.number().default(587),
    SMTP_USER: zod_1.z.string().optional(),
    SMTP_PASSWORD: zod_1.z.string().optional(),
    SMTP_FROM: zod_1.z.string().optional(),
    BULLMQ_CONCURRENCY: zod_1.z.coerce.number().default(5),
});
//# sourceMappingURL=validation.js.map