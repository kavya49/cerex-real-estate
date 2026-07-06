"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullModule = exports.BULL_QUEUES = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const redis_module_1 = require("../redis/redis.module");
exports.BULL_QUEUES = {
    EMAIL: "email",
    WHATSAPP: "whatsapp",
    NOTIFICATIONS: "notifications",
    ANALYTICS: "analytics",
    AI_PROCESSING: "ai-processing",
    EXPORT: "export",
    WEBHOOK: "webhook",
};
const queueProviders = Object.values(exports.BULL_QUEUES).map((name) => ({
    provide: `BULL_QUEUE_${name.toUpperCase()}`,
    useFactory: (redisClient) => new bullmq_1.Queue(name, { connection: redisClient }),
    inject: [redis_module_1.REDIS_CLIENT],
}));
let BullModule = class BullModule {
};
exports.BullModule = BullModule;
exports.BullModule = BullModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [...queueProviders],
        exports: [...queueProviders],
    })
], BullModule);
//# sourceMappingURL=bull.module.js.map