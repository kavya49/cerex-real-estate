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
exports.DevelopersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let DevelopersService = class DevelopersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDeveloperDto) {
        const passwordHash = await bcrypt.hash(createDeveloperDto.password, 12);
        return this.prisma.developer.create({
            data: { ...createDeveloperDto, passwordHash },
        });
    }
    async findAll(query) {
        const { page = 1, limit = 10, search, isActive } = query;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { companyName: { contains: search, mode: "insensitive" } },
            ];
        }
        if (isActive !== undefined)
            where.isActive = isActive;
        const [developers, total] = await Promise.all([
            this.prisma.developer.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    companyName: true,
                    isActive: true,
                    createdAt: true,
                    _count: { select: { projects: true } },
                },
            }),
            this.prisma.developer.count({ where }),
        ]);
        return {
            data: developers,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(id) {
        const developer = await this.prisma.developer.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                companyName: true,
                logoUrl: true,
                website: true,
                phone: true,
                address: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                _count: { select: { projects: true } },
            },
        });
        if (!developer)
            throw new common_1.NotFoundException("Developer not found");
        return developer;
    }
    async update(id, updateDeveloperDto) {
        await this.findOne(id);
        return this.prisma.developer.update({
            where: { id },
            data: updateDeveloperDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.developer.delete({ where: { id } });
    }
    async updateStatus(id, isActive) {
        await this.findOne(id);
        return this.prisma.developer.update({ where: { id }, data: { isActive } });
    }
};
exports.DevelopersService = DevelopersService;
exports.DevelopersService = DevelopersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DevelopersService);
//# sourceMappingURL=developers.service.js.map