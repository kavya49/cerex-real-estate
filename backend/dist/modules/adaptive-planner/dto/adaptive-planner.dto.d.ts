export declare class QuestionnaireOptionDto {
    value: string;
    label: string;
    key?: string;
}
export declare class QuestionnaireQuestionDto {
    key: string;
    label: string;
    type: string;
    category: string;
    isMandatory: boolean;
    order: number;
    options?: QuestionnaireOptionDto[];
    minValue?: number;
    maxValue?: number;
    step?: number;
    unit?: string;
    dependsOn?: Record<string, any>;
    branchKey?: string;
    metadata?: Record<string, any>;
}
export declare class QuestionnaireDto {
    id: string;
    name: string;
    description?: string;
    version: string;
    mandatoryCount: number;
    maxQuestions: number;
    avgCompletionSecs: number;
    questions: QuestionnaireQuestionDto[];
}
export declare class PlannerAnswerRequestDto {
    questionKey: string;
    value: any;
    valueType?: string;
    isUnknown?: boolean;
    timeSpentMs?: number;
}
export declare class StartPlannerRequestDto {
    questionnaireId?: string;
}
export declare class SubmitAnswerRequestDto {
    questionKey: string;
    value: any;
    valueType?: string;
    isUnknown?: boolean;
    timeSpentMs?: number;
}
export declare class PlannerStateDto {
    sessionId: string;
    questionnaireId: string;
    questionnaireVersion: string;
    answers: PlannerAnswerRequestDto[];
    completedQuestions: string[];
    pendingQuestions: string[];
    currentQuestion: string | null;
    progress: number;
    isComplete: boolean;
    mandatoryComplete: boolean;
    branchPath: string;
    startedAt: Date;
    updatedAt: Date;
}
export declare class PlannerPreviewDto {
    householdSize: number;
    hasChildren: boolean;
    workFromHome: string;
    moveInMonths: number;
    topPriorities: string[];
    budgetTier: string;
    stylePreferences: string[];
    previewGenerated: boolean;
}
export declare class PlannerResponseDto {
    state: PlannerStateDto;
    preview?: PlannerPreviewDto;
}
export declare class QuestionnaireCreateDto {
    developerId?: string;
    projectId?: string;
    name: string;
    description?: string;
    version: string;
    questions: QuestionnaireQuestionDto[];
}
export declare class QuestionnaireUpdateDto {
    name?: string;
    description?: string;
    isActive?: boolean;
    isDefault?: boolean;
}
export declare class PlannerAnalyticsEventDto {
    eventType: string;
    questionKey: string;
    value?: any;
    previousValue?: any;
    timeSpentMs?: number;
    branchKey?: string;
    anonymousId: string;
}
