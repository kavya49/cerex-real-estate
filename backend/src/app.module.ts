import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";
import { ThrottlerModuleOptions } from "@nestjs/throttler";
import { EventEmitterModule } from "@nestjs/event-emitter";

import { PrismaModule } from "./prisma/prisma.module";
import { RedisModule } from "./common/redis/redis.module";
import { BullModule } from "./common/bull/bull.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DevelopersModule } from "./modules/developers/developers.module";
import { ProjectsModule } from "./modules/projects/projects.module";
import { ProjectConfigModule } from "./modules/project-config/project-config.module";
import { BuyersModule } from "./modules/buyers/buyers.module";
import { PlannerModule } from "./modules/planner/planner.module";
import { ViewerModule } from "./modules/viewer/viewer.module";
import { FurnitureModule } from "./modules/furniture/furniture.module";
import { KnowledgeModule } from "./modules/knowledge/knowledge.module";
import { EventsModule } from "./modules/events/events.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { LeadsModule } from "./modules/leads/leads.module";
import { StorageModule } from "./modules/storage/storage.module";
import { WhatsappModule } from "./modules/whatsapp/whatsapp.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";
import { CrmModule } from "./modules/crm/crm.module";
import { SummaryModule } from "./modules/summary/summary.module";
import { HealthModule } from "./modules/health/health.module";
import { configuration } from "./config/configuration";
import { validationSchema } from "./config/validation";
import { BuyerSessionModule } from "./modules/buyer-session/buyer-session.module";
import { PlannerIntelligenceModule } from "./modules/planner-intelligence/planner-intelligence.module";
import { DecisionEngineModule } from "./modules/decision-engine/decision-engine.module";
import { AdaptivePlannerModule } from "./modules/adaptive-planner/adaptive-planner.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      envFilePath: [".env.local", ".env"],
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<string>("LOG_LEVEL", "debug"),
          transport:
            configService.get<string>("LOG_PRETTY", "true") === "true"
              ? {
                  target: "pino-pretty",
                  options: {
                    colorize: true,
                    translateTime: "HH:MM:ss Z",
                    ignore: "pid,hostname",
                  },
                }
              : undefined,
          autoLogging: true,
          serializers: {
            req: (req) => ({
              method: req.method,
              url: req.url,
              headers: req.headers,
            }),
            res: (res) => ({ statusCode: res.statusCode }),
          },
          customProps: (req) => ({
            projectId: req.headers["x-project-id"],
            projectSlug: req.headers["x-project-slug"],
          }),
        },
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [
          {
            ttl: configService.get<number>("THROTTLE_TTL", 60) * 1000,
            limit: configService.get<number>("THROTTLE_LIMIT", 100),
          },
        ],
      }),
    }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    RedisModule,
    BullModule,
    AuthModule,
    DevelopersModule,
    ProjectsModule,
    ProjectConfigModule,
    BuyersModule,
    PlannerModule,
    ViewerModule,
    FurnitureModule,
    KnowledgeModule,
    EventsModule,
    AnalyticsModule,
    SummaryModule,
    LeadsModule,
    StorageModule,
    WhatsappModule,
    NotificationsModule,
    DashboardModule,
    CrmModule,
    HealthModule,
    BuyerSessionModule,
    PlannerIntelligenceModule,
    DecisionEngineModule,
    AdaptivePlannerModule,
  ],
})
export class AppModule {}
