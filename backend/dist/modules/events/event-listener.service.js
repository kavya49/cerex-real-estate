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
var EventListenerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_service_1 = require("../../prisma/prisma.service");
let EventListenerService = EventListenerService_1 = class EventListenerService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(EventListenerService_1.name);
    }
    async handleEventRecorded(payload) {
        if (!payload.buyerId)
            return;
        try {
            await this.prisma.buyer.update({
                where: { id: payload.buyerId },
                data: {
                    lastActiveAt: payload.timestamp,
                },
            });
        }
        catch (error) {
            this.logger.error(`Failed to update buyer lastActiveAt: ${error.message}`, error.stack);
        }
    }
    async handlePlannerCompleted(payload) {
        this.logger.log(`Planner completed for buyer ${payload.buyerId} in project ${payload.projectId} with recommendation ${payload.recommendation} (score: ${payload.score})`);
    }
    async handleSiteVisitRequested(payload) {
        this.logger.log(`Site visit requested by buyer ${payload.buyerId} for project ${payload.projectId}, lead ${payload.leadId}`);
    }
};
exports.EventListenerService = EventListenerService;
__decorate([
    (0, event_emitter_1.OnEvent)("event.recorded"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handleEventRecorded", null);
__decorate([
    (0, event_emitter_1.OnEvent)("planner.completed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handlePlannerCompleted", null);
__decorate([
    (0, event_emitter_1.OnEvent)("site_visit_requested"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventListenerService.prototype, "handleSiteVisitRequested", null);
exports.EventListenerService = EventListenerService = EventListenerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventListenerService);
//# sourceMappingURL=event-listener.service.js.map