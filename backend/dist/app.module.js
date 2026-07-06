"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const nestjs_pino_1 = require("nestjs-pino");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_module_1 = require("./prisma/prisma.module");
const redis_module_1 = require("./common/redis/redis.module");
const bull_module_1 = require("./common/bull/bull.module");
const auth_module_1 = require("./modules/auth/auth.module");
const developers_module_1 = require("./modules/developers/developers.module");
const projects_module_1 = require("./modules/projects/projects.module");
const project_config_module_1 = require("./modules/project-config/project-config.module");
const buyers_module_1 = require("./modules/buyers/buyers.module");
const planner_module_1 = require("./modules/planner/planner.module");
const viewer_module_1 = require("./modules/viewer/viewer.module");
const furniture_module_1 = require("./modules/furniture/furniture.module");
const knowledge_module_1 = require("./modules/knowledge/knowledge.module");
const events_module_1 = require("./modules/events/events.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const leads_module_1 = require("./modules/leads/leads.module");
const storage_module_1 = require("./modules/storage/storage.module");
const whatsapp_module_1 = require("./modules/whatsapp/whatsapp.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
const crm_module_1 = require("./modules/crm/crm.module");
const summary_module_1 = require("./modules/summary/summary.module");
const health_module_1 = require("./modules/health/health.module");
const configuration_1 = require("./config/configuration");
const validation_1 = require("./config/validation");
const buyer_session_module_1 = require("./modules/buyer-session/buyer-session.module");
const planner_intelligence_module_1 = require("./modules/planner-intelligence/planner-intelligence.module");
const decision_engine_module_1 = require("./modules/decision-engine/decision-engine.module");
const adaptive_planner_module_1 = require("./modules/adaptive-planner/adaptive-planner.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration],
                validationSchema: validation_1.validationSchema,
                validationOptions: {
                    allowUnknown: true,
                    abortEarly: true,
                },
                envFilePath: [".env.local", ".env"],
            }),
            nestjs_pino_1.LoggerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    pinoHttp: {
                        level: configService.get("LOG_LEVEL", "debug"),
                        transport: configService.get("LOG_PRETTY", "true") === "true"
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
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    throttlers: [
                        {
                            ttl: configService.get("THROTTLE_TTL", 60) * 1000,
                            limit: configService.get("THROTTLE_LIMIT", 100),
                        },
                    ],
                }),
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            bull_module_1.BullModule,
            auth_module_1.AuthModule,
            developers_module_1.DevelopersModule,
            projects_module_1.ProjectsModule,
            project_config_module_1.ProjectConfigModule,
            buyers_module_1.BuyersModule,
            planner_module_1.PlannerModule,
            viewer_module_1.ViewerModule,
            furniture_module_1.FurnitureModule,
            knowledge_module_1.KnowledgeModule,
            events_module_1.EventsModule,
            analytics_module_1.AnalyticsModule,
            summary_module_1.SummaryModule,
            leads_module_1.LeadsModule,
            storage_module_1.StorageModule,
            whatsapp_module_1.WhatsappModule,
            notifications_module_1.NotificationsModule,
            dashboard_module_1.DashboardModule,
            crm_module_1.CrmModule,
            health_module_1.HealthModule,
            buyer_session_module_1.BuyerSessionModule,
            planner_intelligence_module_1.PlannerIntelligenceModule,
            decision_engine_module_1.DecisionEngineModule,
            adaptive_planner_module_1.AdaptivePlannerModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map