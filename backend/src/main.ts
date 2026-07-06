import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";
import compression from "compression";
import * as cookieParser from "cookie-parser";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";

import { AppModule } from "./app.module";
import { PrismaService } from "./prisma/prisma.service";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { ProjectResolutionMiddleware } from "./middleware/project-resolution.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>("PORT", 3000);
  const apiPrefix = configService.get<string>("API_PREFIX", "api/v1");
  const corsOrigin = configService.get<string>(
    "CORS_ORIGIN",
    "http://localhost:5173",
  );
  const nodeEnv = configService.get<string>("NODE_ENV", "development");

  const logger = app.get(Logger);
  app.useLogger(logger);

  // Global middleware for project resolution
  const prisma = app.get(PrismaService);
  const projectMiddleware = new ProjectResolutionMiddleware(prisma);
  app.use(projectMiddleware.use.bind(projectMiddleware));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(
    helmet({
      contentSecurityPolicy: nodeEnv === "production" ? undefined : false,
      crossOriginEmbedderPolicy: nodeEnv === "production",
    }),
  );

  app.use(compression());
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

  app.useGlobalPipes(
    new ValidationPipe({
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
    }),
  );

  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>("SWAGGER_TITLE", "Cerex Platform API"))
    .setDescription(
      configService.get<string>(
        "SWAGGER_DESCRIPTION",
        "Production-grade multi-tenant PropTech SaaS platform API",
      ),
    )
    .setVersion(configService.get<string>("SWAGGER_VERSION", "1.0.0"))
    .addBearerAuth()
    .addGlobalParameters(
      {
        name: "X-Project-ID",
        in: "header",
        description: "Project identifier for multi-tenant requests",
        required: false,
        schema: { type: "string" },
      },
      {
        name: "X-Project-Slug",
        in: "header",
        description: "Project slug for multi-tenant requests",
        required: false,
        schema: { type: "string" },
      },
    )
    .addTag("auth", "Authentication endpoints")
    .addTag("developers", "Developer management")
    .addTag("projects", "Project management")
    .addTag("buyers", "Buyer management")
    .addTag("planner", "AI Planner")
    .addTag("viewer", "3D Viewer")
    .addTag("leads", "Lead management")
    .addTag("analytics", "Analytics & Events")
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(
    configService.get<string>("SWAGGER_PATH", "docs"),
    app,
    document,
    {
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: "alpha",
        operationsSorter: "alpha",
      },
      customSiteTitle: "Cerex Platform API Docs",
    },
  );

  await app.listen(port);

  logger.log(
    `🚀 Cerex Platform API running on http://localhost:${port}/${apiPrefix}`,
  );
  logger.log(
    `📚 Swagger docs available at http://localhost:${port}/${configService.get<string>("SWAGGER_PATH", "docs")}`,
  );
}

bootstrap();
