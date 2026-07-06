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
exports.SummaryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SummaryService = class SummaryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary(projectId, buyerId) {
        const buyer = await this.prisma.buyer.findFirst({
            where: { id: buyerId, projectId },
            include: {
                events: { orderBy: { timestamp: "desc" }, take: 50 },
                leads: {
                    where: { projectId },
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
        });
        if (!buyer) {
            throw new common_1.NotFoundException("Buyer not found");
        }
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            select: { id: true, name: true, slug: true },
        });
        const layout = buyer.selectedLayout
            ? this.getLayoutMeta(buyer.selectedLayout)
            : null;
        return {
            buyer: {
                id: buyer.id,
                email: buyer.email,
                name: buyer.name,
                familySize: buyer.familySize,
                children: buyer.children,
                workFromHome: buyer.workFromHome,
                lifestyle: buyer.lifestyle,
                timeline: buyer.timeline,
                style: buyer.style,
                budget: buyer.budget,
                selectedLayout: buyer.selectedLayout,
                lastActiveAt: buyer.lastActiveAt,
            },
            layout,
            events: buyer.events.map((e) => ({
                id: e.id,
                name: e.name,
                properties: e.properties,
                timestamp: e.timestamp,
            })),
            lead: buyer.leads[0]
                ? {
                    id: buyer.leads[0].id,
                    name: buyer.leads[0].name,
                    phone: buyer.leads[0].phone,
                    email: buyer.leads[0].email,
                    intent: buyer.leads[0].intent,
                    status: buyer.leads[0].status,
                    createdAt: buyer.leads[0].createdAt,
                }
                : null,
            project: project,
        };
    }
    getLayoutMeta(key) {
        const layouts = {
            "modern-luxury": {
                key: "modern-luxury",
                name: "Modern Luxury",
                tag: "Premium · City-facing",
                sqft: "1,720 sq ft",
                tower: "Tower B",
                floor: "14th Floor",
            },
            family: {
                key: "family",
                name: "Family Layout",
                tag: "Spacious · Kid-friendly",
                sqft: "1,820 sq ft",
                tower: "Tower A",
                floor: "08th Floor",
            },
            office: {
                key: "office",
                name: "Home Office Layout",
                tag: "WFH-optimized · Quiet wing",
                sqft: "1,680 sq ft",
                tower: "Tower C",
                floor: "12th Floor",
            },
            balcony: {
                key: "balcony",
                name: "Balcony Lifestyle Layout",
                tag: "Wide deck · Skyline view",
                sqft: "1,780 sq ft",
                tower: "Tower B",
                floor: "22nd Floor",
            },
        };
        return layouts[key] || null;
    }
};
exports.SummaryService = SummaryService;
exports.SummaryService = SummaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SummaryService);
//# sourceMappingURL=summary.service.js.map