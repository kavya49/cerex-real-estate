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
exports.BuyersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BuyersService = class BuyersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(projectId, createBuyerDto) {
        return this.prisma.buyer.create({
            data: { ...createBuyerDto, projectId },
        });
    }
    async findAll(projectId, query) {
        const { page = 1, limit = 20, search, layout } = query;
        const skip = (page - 1) * limit;
        const where = { projectId };
        if (search) {
            where.OR = [
                { email: { contains: search, mode: "insensitive" } },
                { name: { contains: search, mode: "insensitive" } },
                { phone: { contains: search, mode: "insensitive" } },
            ];
        }
        if (layout)
            where.selectedLayout = layout;
        const [buyers, total] = await Promise.all([
            this.prisma.buyer.findMany({
                where,
                skip,
                take: limit,
                orderBy: { lastActiveAt: "desc" },
            }),
            this.prisma.buyer.count({ where }),
        ]);
        return {
            data: buyers,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(projectId, id) {
        const buyer = await this.prisma.buyer.findFirst({
            where: { id, projectId },
        });
        if (!buyer)
            throw new common_1.NotFoundException("Buyer not found");
        return buyer;
    }
    async findByEmail(projectId, email) {
        const buyer = await this.prisma.buyer.findFirst({
            where: { projectId, email },
        });
        if (!buyer)
            throw new common_1.NotFoundException("Buyer not found");
        return buyer;
    }
    async update(projectId, id, updateBuyerDto) {
        await this.findOne(projectId, id);
        return this.prisma.buyer.update({ where: { id }, data: updateBuyerDto });
    }
    async remove(projectId, id) {
        await this.findOne(projectId, id);
        return this.prisma.buyer.delete({ where: { id } });
    }
};
exports.BuyersService = BuyersService;
exports.BuyersService = BuyersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BuyersService);
//# sourceMappingURL=buyers.service.js.map