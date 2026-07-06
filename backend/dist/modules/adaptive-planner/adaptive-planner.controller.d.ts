import { AdaptivePlannerService } from "./adaptive-planner.service";
import { StartPlannerRequestDto, SubmitAnswerRequestDto, PlannerResponseDto, QuestionnaireDto, QuestionnaireCreateDto, QuestionnaireUpdateDto, PlannerAnalyticsEventDto } from "./dto/adaptive-planner.dto";
export declare class AdaptivePlannerController {
    private readonly adaptivePlannerService;
    constructor(adaptivePlannerService: AdaptivePlannerService);
    getQuestionnaire(projectId: string, questionnaireId?: string): Promise<QuestionnaireDto>;
    startPlanner(projectId: string, request: StartPlannerRequestDto, buyerId: string, sessionId: string): Promise<PlannerResponseDto>;
    submitAnswer(projectId: string, request: SubmitAnswerRequestDto, buyerId: string, sessionId: string): Promise<PlannerResponseDto>;
    resumePlanner(projectId: string, sessionId: string, buyerId: string): Promise<PlannerResponseDto>;
    trackAnalytics(projectId: string, request: PlannerAnalyticsEventDto, buyerId: string, sessionId: string, questionnaireId: string): Promise<{
        success: boolean;
    }>;
}
export declare class QuestionnaireAdminController {
    private readonly adaptivePlannerService;
    constructor(adaptivePlannerService: AdaptivePlannerService);
    createQuestionnaire(request: QuestionnaireCreateDto): Promise<QuestionnaireDto>;
    listQuestionnaires(developerId?: string, projectId?: string): Promise<QuestionnaireDto[]>;
    getQuestionnaire(id: string): Promise<QuestionnaireDto>;
    updateQuestionnaire(id: string, request: QuestionnaireUpdateDto): Promise<QuestionnaireDto>;
}
