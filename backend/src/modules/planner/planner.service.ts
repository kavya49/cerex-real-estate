import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PlannerAnswersDto } from "./dto/planner.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class PlannerService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async processAnswers(
    projectId: string,
    buyerId: string,
    plannerAnswersDto: PlannerAnswersDto,
  ) {
    const recommendation = await this.getRecommendation(
      projectId,
      plannerAnswersDto,
    );

    // Persist planner answers to buyer profile
    await this.prisma.buyer.update({
      where: { id: buyerId },
      data: {
        ...plannerAnswersDto,
        selectedLayout: recommendation.layout.key,
        lastActiveAt: new Date(),
      },
    });

    // Emit event for planner completed
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

  async getLayouts(projectId: string) {
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

  async getRecommendation(projectId: string, answers: PlannerAnswersDto) {
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

  private calculateScore(layout: any, answers: PlannerAnswersDto): number {
    let score = 50;
    if (answers.style === "Modern Luxury" && layout.key === "modern-luxury")
      score += 30;
    if (
      answers.children &&
      answers.children !== "None" &&
      layout.key === "family"
    )
      score += 30;
    if (answers.workFromHome === "Full-time" && layout.key === "office")
      score += 30;
    if (answers.lifestyle === "Wellness" && layout.key === "balcony")
      score += 30;
    return Math.min(98, score);
  }
}
