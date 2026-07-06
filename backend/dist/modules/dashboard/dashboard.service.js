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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async overview(projectId) {
        const [buyers, leads, events, apartments] = await Promise.all([
            this.prisma.buyer.count({ where: { projectId } }),
            this.prisma.lead.count({ where: { projectId } }),
            this.prisma.event.count({ where: { projectId } }),
            this.prisma.apartment.count({ where: { projectId } }),
        ]);
        return { buyers, leads, events, apartments };
    }
    async funnel(projectId) {
        const [visits, planner, experience, summary, leads] = await Promise.all([
            this.prisma.event.count({ where: { projectId, name: "page_view" } }),
            this.prisma.event.count({
                where: { projectId, name: "planner_started" },
            }),
            this.prisma.event.count({
                where: { projectId, name: "experience_viewed" },
            }),
            this.prisma.event.count({ where: { projectId, name: "summary_viewed" } }),
            this.prisma.lead.count({ where: { projectId } }),
        ]);
        return { visits, planner, experience, summary, leads };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map