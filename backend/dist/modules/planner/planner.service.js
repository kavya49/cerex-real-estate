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
exports.PlannerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let PlannerService = class PlannerService {
    constructor(prisma, eventEmitter) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async processAnswers(projectId, buyerId, plannerAnswersDto) {
        const recommendation = await this.getRecommendation(projectId, plannerAnswersDto);
        await this.prisma.buyer.update({
            where: { id: buyerId },
            data: {
                ...plannerAnswersDto,
                selectedLayout: recommendation.layout.key,
                lastActiveAt: new Date(),
            },
        });
        this.eventEmitter.emit("planner.completed", {
            projectId,
            buyerId,
            answers: plannerAnswersDto,
            recommendation: recommendation.layout.key,
            score: recommendation.score,
            timestamp: new Date(),
        });
        return { ...plannerAnswersDto, recommendation };
    }
    async getLayouts(projectId) {
        const project = await this.prisma.project.findUnique({
            where: { id: projectId },
            include: { config: true },
        });
        if (!project || !project.config?.enablePlanner) {
            return [];
        }
        return [
            {
                key: "modern-luxury",
                name: "Modern Luxury",
                tag: "Premium · City-facing",
                sqft: "1,720 sq ft",
                tower: "Tower B",
                floor: "14th Floor",
            },
            {
                key: "family",
                name: "Family Layout",
                tag: "Spacious · Kid-friendly",
                sqft: "1,820 sq ft",
                tower: "Tower A",
                floor: "08th Floor",
            },
            {
                key: "office",
                name: "Home Office Layout",
                tag: "WFH-optimized · Quiet wing",
                sqft: "1,680 sq ft",
                tower: "Tower C",
                floor: "12th Floor",
            },
            {
                key: "balcony",
                name: "Balcony Lifestyle Layout",
                tag: "Wide deck · Skyline view",
                sqft: "1,780 sq ft",
                tower: "Tower B",
                floor: "22nd Floor",
            },
        ];
    }
    async getRecommendation(projectId, answers) {
        const layouts = await this.getLayouts(projectId);
        let bestLayout = layouts[0];
        let bestScore = 0;
        for (const layout of layouts) {
            const score = this.calculateScore(layout, answers);
            if (score > bestScore) {
                bestScore = score;
                bestLayout = layout;
            }
        }
        return { layout: bestLayout, score: bestScore };
    }
    calculateScore(layout, answers) {
        let score = 50;
        if (answers.style === "Modern Luxury" && layout.key === "modern-luxury")
            score += 30;
        if (answers.children &&
            answers.children !== "None" &&
            layout.key === "family")
            score += 30;
        if (answers.workFromHome === "Full-time" && layout.key === "office")
            score += 30;
        if (answers.lifestyle === "Wellness" && layout.key === "balcony")
            score += 30;
        return Math.min(98, score);
    }
};
exports.PlannerService = PlannerService;
exports.PlannerService = PlannerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], PlannerService);
//# sourceMappingURL=planner.service.js.map