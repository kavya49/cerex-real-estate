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
var ProjectResolutionMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectResolutionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectResolutionMiddleware = ProjectResolutionMiddleware_1 = class ProjectResolutionMiddleware {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ProjectResolutionMiddleware_1.name);
    }
    async use(req, res, next) {
        const projectId = req.headers["x-project-id"];
        const projectSlug = req.headers["x-project-slug"];
        if (!projectId && !projectSlug) {
            this.logger.warn("No project context provided in request");
            return next();
        }
        try {
            let project;
            if (projectId) {
                project = await this.prisma.project.findUnique({
                    where: { id: projectId },
                    select: {
                        id: true,
                        slug: true,
                        developerId: true,
                        isActive: true,
                        isPublished: true,
                    },
                });
            }
            else if (projectSlug) {
                project = await this.prisma.project.findUnique({
                    where: { slug: projectSlug },
                    select: {
                        id: true,
                        slug: true,
                        developerId: true,
                        isActive: true,
                        isPublished: true,
                    },
                });
            }
            if (!project) {
                this.logger.warn(`Project not found: ${projectId || projectSlug}`);
                return next();
            }
            if (!project.isActive) {
                this.logger.warn(`Project inactive: ${project.id}`);
                return res.status(403).json({
                    statusCode: 403,
                    message: "Project is not active",
                    error: "Forbidden",
                });
            }
            req.project = {
                projectId: project.id,
                projectSlug: project.slug,
                developerId: project.developerId,
            };
            res.setHeader("X-Project-ID", project.id);
            res.setHeader("X-Project-Slug", project.slug);
            next();
        }
        catch (error) {
            this.logger.error(`Project resolution error: ${error.message}`, error.stack);
            next(error);
        }
    }
};
exports.ProjectResolutionMiddleware = ProjectResolutionMiddleware;
exports.ProjectResolutionMiddleware = ProjectResolutionMiddleware = ProjectResolutionMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectResolutionMiddleware);
//# sourceMappingURL=project-resolution.middleware.js.map