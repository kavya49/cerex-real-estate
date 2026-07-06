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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LeadsService = class LeadsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(projectId, dto) {
        return this.prisma.lead.create({ data: { ...dto, projectId } });
    }
    async findAll(projectId, query) {
        const { page = 1, limit = 20, status } = query;
        const skip = (page - 1) * limit;
        const where = { projectId };
        if (status)
            where.status = status;
        const [data, total] = await Promise.all([
            this.prisma.lead.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            this.prisma.lead.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(projectId, id) {
        const lead = await this.prisma.lead.findFirst({ where: { id, projectId } });
        if (!lead)
            throw new common_1.NotFoundException("Lead not found");
        return lead;
    }
    async update(projectId, id, dto) {
        await this.findOne(projectId, id);
        return this.prisma.lead.update({ where: { id }, data: dto });
    }
    async remove(projectId, id) {
        await this.findOne(projectId, id);
        return this.prisma.lead.delete({ where: { id } });
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map