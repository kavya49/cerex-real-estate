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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_service_1 = require("../../prisma/prisma.service");
let EventsService = class EventsService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async create(projectId, dto) {
        const event = await this.prisma.event.create({
            data: { ...dto, projectId },
        });
        this.eventEmitter.emit("event.recorded", {
            projectId,
            buyerId: dto.buyerId,
            sessionId: dto.sessionId,
            name: dto.name,
            properties: dto.properties,
            timestamp: event.timestamp,
        });
        return event;
    }
    async findAll(projectId, query) {
        const { page = 1, limit = 50, name, buyerId, sessionId } = query;
        const skip = (page - 1) * limit;
        const where = { projectId };
        if (name)
            where.name = name;
        if (buyerId)
            where.buyerId = buyerId;
        if (sessionId)
            where.sessionId = sessionId;
        const [data, total] = await Promise.all([
            this.prisma.event.findMany({
                where,
                skip,
                take: limit,
                orderBy: { timestamp: "desc" },
            }),
            this.prisma.event.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], EventsService);
//# sourceMappingURL=events.service.js.map