"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression_1 = require("compression");
const cookieParser = require("cookie-parser");
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma/prisma.service");
const all_exceptions_filter_1 = require("./filters/all-exceptions.filter");
const transform_interceptor_1 = require("./interceptors/transform.interceptor");
const project_resolution_middleware_1 = require("./middleware/project-resolution.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get("PORT", 3000);
    const apiPrefix = configService.get("API_PREFIX", "api/v1");
    const corsOrigin = configService.get("CORS_ORIGIN", "http://localhost:5173");
    const nodeEnv = configService.get("NODE_ENV", "development");
    const logger = app.get(nestjs_pino_1.Logger);
    app.useLogger(logger);
    const prisma = app.get(prisma_service_1.PrismaService);
    const projectMiddleware = new project_resolution_middleware_1.ProjectResolutionMiddleware(prisma);
    app.use(projectMiddleware.use.bind(projectMiddleware));
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: nodeEnv === "production" ? undefined : false,
        crossOriginEmbedderPolicy: nodeEnv === "production",
    }));
    app.use((0, compression_1.default)());
    app.use(cookieParser());
    app.enableCors({
        origin: corsOrigin.split(",").map((o) => o.trim()),
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Project-ID",
            "X-Project-Slug",
        ],
        exposedHeaders: ["X-Total-Count"],
    });
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
        disableErrorMessages: nodeEnv === "production",
        validationError: {
            target: false,
            value: false,
        },
    }));
    app.useGlobalInterceptors(new nestjs_pino_1.LoggerErrorInterceptor());
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(configService.get("SWAGGER_TITLE", "Cerex Platform API"))
        .setDescription(configService.get("SWAGGER_DESCRIPTION", "Production-grade multi-tenant PropTech SaaS platform API"))
        .setVersion(configService.get("SWAGGER_VERSION", "1.0.0"))
        .addBearerAuth()
        .addGlobalParameters({
        name: "X-Project-ID",
        in: "header",
        description: "Project identifier for multi-tenant requests",
        required: false,
        schema: { type: "string" },
    }, {
        name: "X-Project-Slug",
        in: "header",
        description: "Project slug for multi-tenant requests",
        required: false,
        schema: { type: "string" },
    })
        .addTag("auth", "Authentication endpoints")
        .addTag("developers", "Developer management")
        .addTag("projects", "Project management")
        .addTag("buyers", "Buyer management")
        .addTag("planner", "AI Planner")
        .addTag("viewer", "3D Viewer")
        .addTag("leads", "Lead management")
        .addTag("analytics", "Analytics & Events")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(configService.get("SWAGGER_PATH", "docs"), app, document, {
        swaggerOptions: {
            persistAuthorization: true,
            tagsSorter: "alpha",
            operationsSorter: "alpha",
        },
        customSiteTitle: "Cerex Platform API Docs",
    });
    await app.listen(port);
    logger.log(`🚀 Cerex Platform API running on http://localhost:${port}/${apiPrefix}`);
    logger.log(`📚 Swagger docs available at http://localhost:${port}/${configService.get("SWAGGER_PATH", "docs")}`);
}
bootstrap();
//# sourceMappingURL=main.js.map