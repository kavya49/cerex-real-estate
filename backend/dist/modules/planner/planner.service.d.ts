import { PrismaService } from "../../prisma/prisma.service";
import { PlannerAnswersDto } from "./dto/planner.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
export declare class PlannerService {
    private prisma;
    private eventEmitter;
    constructor(prisma: PrismaService, eventEmitter: EventEmitter2);
    processAnswers(projectId: string, buyerId: string, plannerAnswersDto: PlannerAnswersDto): Promise<{
        recommendation: {
            layout: {
                key: string;
                name: string;
                tag: string;
                sqft: string;
                tower: string;
                floor: string;
            };
            score: number;
        };
        familySize: string;
        children: string;
        workFromHome: string;
        lifestyle: string;
        timeline: string;
        style: string;
        budget: number;
    }>;
    getLayouts(projectId: string): Promise<{
        key: string;
        name: string;
        tag: string;
        sqft: string;
        tower: string;
        floor: string;
    }[]>;
    getRecommendation(projectId: string, answers: PlannerAnswersDto): Promise<{
        layout: {
            key: string;
            name: string;
            tag: string;
            sqft: string;
            tower: string;
            floor: string;
        };
        score: number;
    }>;
    private calculateScore;
}
