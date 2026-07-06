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
exports.FurnitureService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FurnitureService = class FurnitureService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(projectId, dto) {
        return this.prisma.furniture.create({ data: { ...dto, projectId } });
    }
    async findAll(projectId, query) {
        const { page = 1, limit = 20, category, style, isActive } = query;
        const skip = (page - 1) * limit;
        const where = { projectId };
        if (category)
            where.category = category;
        if (style)
            where.style = style;
        if (isActive !== undefined)
            where.isActive = isActive;
        const [data, total] = await Promise.all([
            this.prisma.furniture.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            this.prisma.furniture.count({ where }),
        ]);
        return {
            data,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(projectId, id) {
        const item = await this.prisma.furniture.findFirst({
            where: { id, projectId },
        });
        if (!item)
            throw new common_1.NotFoundException("Furniture not found");
        return item;
    }
    async update(projectId, id, dto) {
        await this.findOne(projectId, id);
        return this.prisma.furniture.update({ where: { id }, data: dto });
    }
    async remove(projectId, id) {
        await this.findOne(projectId, id);
        return this.prisma.furniture.delete({ where: { id } });
    }
};
exports.FurnitureService = FurnitureService;
exports.FurnitureService = FurnitureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FurnitureService);
//# sourceMappingURL=furniture.service.js.map