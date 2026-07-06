import { PlannerService } from "./planner.service";
import { PlannerAnswersDto } from "./dto/planner.dto";
export declare class PlannerController {
    private readonly plannerService;
    constructor(plannerService: PlannerService);
    submitAnswers(projectId: string, plannerAnswersDto: PlannerAnswersDto, req: any): Promise<{
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
    getRecommendation(projectId: string, plannerAnswersDto: PlannerAnswersDto): Promise<{
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
}
