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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectDto, developerId) {
        const slug = this.generateSlug(createProjectDto.name);
        const uniqueSlug = await this.ensureUniqueSlug(slug);
        const project = await this.prisma.project.create({
            data: {
                ...createProjectDto,
                slug: uniqueSlug,
                developerId,
            },
            include: { config: true },
        });
        return project;
    }
    async findAll(query, developerId) {
        const { page = 1, limit = 10, search, isActive, isPublished } = query;
        const skip = (page - 1) * limit;
        const where = { developerId };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }
        if (isActive !== undefined)
            where.isActive = isActive;
        if (isPublished !== undefined)
            where.isPublished = isPublished;
        const [projects, total] = await Promise.all([
            this.prisma.project.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    config: true,
                    _count: { select: { apartments: true, buyers: true, leads: true } },
                },
            }),
            this.prisma.project.count({ where }),
        ]);
        return {
            data: projects,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(id) {
        const project = await this.prisma.project.findUnique({
            where: { id },
            include: {
                config: true,
                developer: { select: { id: true, name: true, email: true } },
            },
        });
        if (!project)
            throw new common_1.NotFoundException("Project not found");
        return project;
    }
    async findBySlug(slug) {
        const project = await this.prisma.project.findUnique({
            where: { slug },
            include: { config: true },
        });
        if (!project)
            throw new common_1.NotFoundException("Project not found");
        return project;
    }
    async update(id, updateProjectDto) {
        await this.findOne(id);
        const slug = updateProjectDto.name
            ? this.generateSlug(updateProjectDto.name)
            : undefined;
        const uniqueSlug = slug ? await this.ensureUniqueSlug(slug, id) : undefined;
        return this.prisma.project.update({
            where: { id },
            data: { ...updateProjectDto, slug: uniqueSlug },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.project.delete({ where: { id } });
    }
    async publish(id) {
        await this.findOne(id);
        return this.prisma.project.update({
            where: { id },
            data: { isPublished: true },
        });
    }
    async unpublish(id) {
        await this.findOne(id);
        return this.prisma.project.update({
            where: { id },
            data: { isPublished: false },
        });
    }
    generateSlug(name) {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
    async ensureUniqueSlug(slug, excludeId) {
        let uniqueSlug = slug;
        let counter = 1;
        while (true) {
            const existing = await this.prisma.project.findUnique({
                where: { slug: uniqueSlug },
            });
            if (!existing || existing.id === excludeId)
                break;
            uniqueSlug = `${slug}-${counter++}`;
        }
        return uniqueSlug;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map