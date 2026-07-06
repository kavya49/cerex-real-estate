"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_module_1 = require("../../common/redis/redis.module");
const common_2 = require("@nestjs/common");
let HealthController = class HealthController {
    constructor(health, prisma, redis) {
        this.health = health;
        this.prisma = prisma;
        this.redis = redis;
    }
    check() {
        return this.health.check([
            () => this.checkDatabase(),
            () => this.checkRedis(),
        ]);
    }
    live() {
        return this.health.check([]);
    }
    ready() {
        return this.health.check([
            () => this.checkDatabase(),
            () => this.checkRedis(),
        ]);
    }
    async checkDatabase() {
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            return { database: { status: "up" } };
        }
        catch (error) {
            return { database: { status: "down", error: error.message } };
        }
    }
    async checkRedis() {
        try {
            await this.redis.ping();
            return { redis: { status: "up" } };
        }
        catch (error) {
            return { redis: { status: "down", error: error.message } };
        }
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)("live"),
    (0, terminus_1.HealthCheck)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "live", null);
__decorate([
    (0, common_1.Get)("ready"),
    (0, terminus_1.HealthCheck)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "ready", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)("health"),
    __param(2, (0, common_2.Inject)(redis_module_1.REDIS_CLIENT)),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        prisma_service_1.PrismaService, Object])
], HealthController);
//# sourceMappingURL=health.controller.js.map