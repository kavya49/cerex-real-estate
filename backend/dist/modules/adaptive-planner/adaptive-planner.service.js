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
var AdaptivePlannerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptivePlannerService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_service_1 = require("../../prisma/prisma.service");
const decision_engine_service_1 = require("../decision-engine/decision-engine.service");
let AdaptivePlannerService = AdaptivePlannerService_1 = class AdaptivePlannerService {
    constructor(prisma, eventEmitter, decisionEngine) {
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
        this.decisionEngine = decisionEngine;
        this.logger = new common_1.Logger(AdaptivePlannerService_1.name);
        this.defaultQuestionnaire = {
            id: "default-v1",
            name: "Default Questionnaire v1",
            description: "Standard adaptive questionnaire for home buyers",
            version: "1.0",
            mandatoryCount: 6,
            maxQuestions: 15,
            avgCompletionSecs: 75,
            questions: [
                {
                    key: "household",
                    label: "Who will live here?",
                    type: "single",
                    category: "household",
                    isMandatory: true,
                    order: 1,
                    options: [
                        { value: "Just Me", label: "Just Me", key: "single" },
                        { value: "Couple", label: "Couple", key: "couple" },
                        {
                            value: "Couple + Child",
                            label: "Couple + Child",
                            key: "couple_child",
                        },
                        { value: "Family", label: "Family", key: "family" },
                        { value: "Joint Family", label: "Joint Family", key: "joint_family" },
                        {
                            value: "Buying as Investment",
                            label: "Buying as Investment",
                            key: "investment",
                        },
                    ],
                    branchKey: "household",
                },
                {
                    key: "purpose",
                    label: "Why are you buying?",
                    type: "single",
                    category: "lifestyle",
                    isMandatory: true,
                    order: 2,
                    options: [
                        { value: "First Home", label: "First Home", key: "first_home" },
                        { value: "Upgrading", label: "Upgrading", key: "upgrading" },
                        { value: "Investment", label: "Investment", key: "investment" },
                        { value: "Parents", label: "Parents", key: "parents" },
                        { value: "Holiday Home", label: "Holiday Home", key: "holiday_home" },
                    ],
                    branchKey: "purpose",
                },
                {
                    key: "priorities",
                    label: "Choose TWO things that matter the most",
                    type: "multi",
                    category: "design",
                    isMandatory: true,
                    order: 3,
                    options: [
                        { value: "More Storage", label: "More Storage", key: "storage" },
                        { value: "Bigger Kitchen", label: "Bigger Kitchen", key: "kitchen" },
                        { value: "Home Office", label: "Home Office", key: "office" },
                        {
                            value: "Spacious Living Room",
                            label: "Spacious Living Room",
                            key: "living_room",
                        },
                        { value: "Kids Space", label: "Kids Space", key: "kids_space" },
                        { value: "Balcony", label: "Balcony", key: "balcony" },
                        {
                            value: "Premium Interiors",
                            label: "Premium Interiors",
                            key: "premium_interiors",
                        },
                        {
                            value: "Low Maintenance",
                            label: "Low Maintenance",
                            key: "low_maintenance",
                        },
                        {
                            value: "Natural Light",
                            label: "Natural Light",
                            key: "natural_light",
                        },
                        { value: "Privacy", label: "Privacy", key: "privacy" },
                    ],
                    branchKey: "priorities",
                },
                {
                    key: "interior_budget",
                    label: "Interior Budget",
                    type: "slider",
                    category: "financial",
                    isMandatory: true,
                    order: 4,
                    minValue: 200000,
                    maxValue: 5000000,
                    step: 100000,
                    unit: "L",
                    branchKey: "interior_budget",
                },
                {
                    key: "interior_style",
                    label: "Interior Style",
                    type: "single",
                    category: "design",
                    isMandatory: true,
                    order: 5,
                    options: [
                        { value: "Scandinavian", label: "Scandinavian", key: "scandinavian" },
                        {
                            value: "Modern Luxury",
                            label: "Modern Luxury",
                            key: "modern_luxury",
                        },
                        { value: "Contemporary", label: "Contemporary", key: "contemporary" },
                        { value: "Warm Indian", label: "Warm Indian", key: "warm_indian" },
                        { value: "Minimalist", label: "Minimalist", key: "minimalist" },
                        { value: "Industrial", label: "Industrial", key: "industrial" },
                    ],
                    branchKey: "interior_style",
                },
                {
                    key: "move_in_timeline",
                    label: "Move-in Timeline",
                    type: "single",
                    category: "lifestyle",
                    isMandatory: true,
                    order: 6,
                    options: [
                        { value: "Immediately", label: "Immediately", key: "immediate" },
                        {
                            value: "Within 3 Months",
                            label: "Within 3 Months",
                            key: "3_months",
                        },
                        { value: "3–6 Months", label: "3–6 Months", key: "3_6_months" },
                        { value: "6–12 Months", label: "6–12 Months", key: "6_12_months" },
                        {
                            value: "Just Exploring",
                            label: "Just Exploring",
                            key: "exploring",
                        },
                    ],
                    branchKey: "move_in_timeline",
                },
                {
                    key: "children_ages",
                    label: "What are your children's ages?",
                    type: "multi",
                    category: "household",
                    isMandatory: false,
                    order: 7,
                    options: [
                        { value: "0-2 years", label: "0-2 years (Toddler)", key: "toddler" },
                        {
                            value: "3-5 years",
                            label: "3-5 years (Preschool)",
                            key: "preschool",
                        },
                        {
                            value: "6-12 years",
                            label: "6-12 years (School Age)",
                            key: "school_age",
                        },
                        { value: "13-17 years", label: "13-17 years (Teen)", key: "teen" },
                        { value: "18+ years", label: "18+ years (Adult)", key: "adult" },
                    ],
                    branchKey: "household",
                    dependsOn: {
                        questionKey: "household",
                        operator: "in",
                        value: ["Couple + Child", "Family", "Joint Family"],
                    },
                    metadata: { maxSelections: 3 },
                },
                {
                    key: "senior_count",
                    label: "How many senior family members (60+)?",
                    type: "single",
                    category: "household",
                    isMandatory: false,
                    order: 8,
                    options: [
                        { value: "0", label: "None", key: "none" },
                        { value: "1", label: "1 Senior", key: "one" },
                        { value: "2", label: "2 Seniors", key: "two" },
                        { value: "3+", label: "3 or more", key: "three_plus" },
                    ],
                    branchKey: "household",
                    dependsOn: {
                        questionKey: "household",
                        operator: "in",
                        value: ["Family", "Joint Family"],
                    },
                },
                {
                    key: "pet_count",
                    label: "Do you have pets?",
                    type: "single",
                    category: "household",
                    isMandatory: false,
                    order: 9,
                    options: [
                        { value: "0", label: "No pets", key: "none" },
                        { value: "1", label: "1 Pet", key: "one" },
                        { value: "2", label: "2 Pets", key: "two" },
                        { value: "3+", label: "3 or more", key: "three_plus" },
                    ],
                    branchKey: "household",
                },
                {
                    key: "work_from_home",
                    label: "How often do you work from home?",
                    type: "single",
                    category: "lifestyle",
                    isMandatory: false,
                    order: 10,
                    options: [
                        {
                            value: "Always",
                            label: "Always (Full-time remote)",
                            key: "always",
                        },
                        { value: "Often", label: "Often (3-4 days/week)", key: "often" },
                        {
                            value: "Sometimes",
                            label: "Sometimes (1-2 days/week)",
                            key: "sometimes",
                        },
                        { value: "Never", label: "Never (Office only)", key: "never" },
                    ],
                    branchKey: "lifestyle",
                    dependsOn: {
                        questionKey: "priorities",
                        operator: "contains",
                        value: "office",
                    },
                },
                {
                    key: "hosting_frequency",
                    label: "How often do you host guests?",
                    type: "single",
                    category: "lifestyle",
                    isMandatory: false,
                    order: 11,
                    options: [
                        { value: "Daily", label: "Daily", key: "daily" },
                        { value: "Weekly", label: "Weekly", key: "weekly" },
                        { value: "Monthly", label: "Monthly", key: "monthly" },
                        { value: "Rarely", label: "Rarely", key: "rarely" },
                        { value: "Never", label: "Never", key: "never" },
                    ],
                    branchKey: "lifestyle",
                    dependsOn: {
                        questionKey: "priorities",
                        operator: "contains",
                        value: "living_room",
                    },
                },
                {
                    key: "cooking_frequency",
                    label: "How often do you cook?",
                    type: "single",
                    category: "lifestyle",
                    isMandatory: false,
                    order: 12,
                    options: [
                        { value: "Daily", label: "Daily", key: "daily" },
                        { value: "Weekly", label: "Weekly", key: "weekly" },
                        { value: "Occasionally", label: "Occasionally", key: "occasionally" },
                        { value: "Rarely", label: "Rarely", key: "rarely" },
                    ],
                    branchKey: "lifestyle",
                    dependsOn: {
                        questionKey: "priorities",
                        operator: "contains",
                        value: "kitchen",
                    },
                },
                {
                    key: "color_preference",
                    label: "Preferred color palette?",
                    type: "single",
                    category: "design",
                    isMandatory: false,
                    order: 13,
                    options: [
                        {
                            value: "Neutral",
                            label: "Neutral (Whites, Greys, Beiges)",
                            key: "neutral",
                        },
                        {
                            value: "Warm",
                            label: "Warm (Earth tones, Terracotta)",
                            key: "warm",
                        },
                        { value: "Cool", label: "Cool (Blues, Greens)", key: "cool" },
                        { value: "Bold", label: "Bold (Jewel tones, Accents)", key: "bold" },
                        {
                            value: "Natural",
                            label: "Natural (Wood, Stone tones)",
                            key: "natural",
                        },
                    ],
                    branchKey: "design",
                },
                {
                    key: "material_preference",
                    label: "Preferred materials?",
                    type: "multi",
                    category: "design",
                    isMandatory: false,
                    order: 14,
                    options: [
                        { value: "Wood", label: "Natural Wood", key: "wood" },
                        { value: "Stone", label: "Stone/Marble", key: "stone" },
                        { value: "Glass", label: "Glass/Metal", key: "glass" },
                        { value: "Fabric", label: "Textiles/Fabrics", key: "fabric" },
                        {
                            value: "Eco-friendly",
                            label: "Eco-friendly/Sustainable",
                            key: "eco",
                        },
                    ],
                    branchKey: "design",
                    dependsOn: {
                        questionKey: "interior_style",
                        operator: "neq",
                        value: "industrial",
                    },
                },
                {
                    key: "investment_horizon",
                    label: "Investment horizon?",
                    type: "single",
                    category: "investment",
                    isMandatory: false,
                    order: 15,
                    options: [
                        {
                            value: "Short-term (< 3 years)",
                            label: "Short-term (< 3 years)",
                            key: "short",
                        },
                        {
                            value: "Medium-term (3-7 years)",
                            label: "Medium-term (3-7 years)",
                            key: "medium",
                        },
                        {
                            value: "Long-term (7+ years)",
                            label: "Long-term (7+ years)",
                            key: "long",
                        },
                    ],
                    branchKey: "investment",
                    dependsOn: {
                        questionKey: "purpose",
                        operator: "eq",
                        value: "Investment",
                    },
                },
            ],
        };
    }
    async getQuestionnaire(questionnaireId) {
        if (!questionnaireId || questionnaireId === "default-v1") {
            return this.defaultQuestionnaire;
        }
        const stored = await this.prisma.questionnaire.findUnique({
            where: { id: questionnaireId },
            include: { questions: true },
        });
        if (!stored) {
            throw new common_1.NotFoundException(`Questionnaire ${questionnaireId} not found`);
        }
        return this.mapToQuestionnaireDto(stored);
    }
    async startPlanner(request, projectId, buyerId, sessionId) {
        const questionnaire = await this.getQuestionnaire(request.questionnaireId);
        const mandatoryQuestions = questionnaire.questions
            .filter((q) => q.isMandatory)
            .sort((a, b) => a.order - b.order);
        const adaptiveQuestions = questionnaire.questions
            .filter((q) => !q.isMandatory)
            .sort((a, b) => a.order - b.order);
        const existingAnswers = await this.prisma.plannerAnswer.findMany({
            where: { buyerId, projectId, sessionId: sessionId || null },
            orderBy: { answeredAt: "asc" },
        });
        const completedQuestions = existingAnswers.map((a) => a.questionKey);
        const answeredMap = new Map(existingAnswers.map((a) => [a.questionKey, a]));
        if (existingAnswers.length === 0) {
            this.eventEmitter.emit("planner.started", {
                buyerId,
                projectId,
                sessionId,
                questionnaireId: questionnaire.id,
                timestamp: new Date(),
            });
            await this.logAnalytics(projectId, questionnaire.id, null, "started", sessionId);
        }
        const currentQuestion = this.getNextQuestion(mandatoryQuestions, adaptiveQuestions, completedQuestions, answeredMap);
        const state = {
            sessionId: sessionId || `temp-${Date.now()}`,
            questionnaireId: questionnaire.id,
            questionnaireVersion: questionnaire.version,
            answers: Array.from(answeredMap.values()).map((a) => ({
                questionKey: a.questionKey,
                value: a.value,
                valueType: a.valueType,
                isUnknown: a.isUnknown,
                timeSpentMs: a.timeSpentMs || undefined,
            })),
            completedQuestions,
            pendingQuestions: this.getPendingQuestions(mandatoryQuestions, adaptiveQuestions, completedQuestions, answeredMap),
            currentQuestion: currentQuestion?.key || null,
            progress: this.calculateProgress(mandatoryQuestions, completedQuestions),
            isComplete: this.isComplete(mandatoryQuestions, adaptiveQuestions, completedQuestions, answeredMap),
            mandatoryComplete: this.isMandatoryComplete(mandatoryQuestions, completedQuestions),
            branchPath: await this.buildBranchPath(buyerId, projectId, sessionId),
            startedAt: existingAnswers[0]?.answeredAt || new Date(),
            updatedAt: new Date(),
        };
        return state;
    }
    async submitAnswer(projectId, buyerId, sessionId, request) {
        const questionnaire = await this.getQuestionnaire();
        const isChanged = await this.isAnswerChanged(buyerId, projectId, questionnaire.id, sessionId, request);
        const existing = await this.prisma.plannerAnswer.findFirst({
            where: {
                buyerId,
                projectId,
                questionKey: request.questionKey,
                questionnaireId: questionnaire.id,
                sessionId: sessionId || null,
            },
        });
        const branchPath = await this.buildBranchPath(buyerId, projectId, sessionId);
        if (existing) {
            await this.prisma.plannerAnswer.update({
                where: { id: existing.id },
                data: {
                    value: request.value,
                    valueType: request.valueType || "string",
                    isUnknown: request.isUnknown || false,
                    timeSpentMs: request.timeSpentMs,
                    branchPath,
                },
            });
        }
        else {
            await this.prisma.plannerAnswer.create({
                data: {
                    buyerId,
                    projectId,
                    sessionId: sessionId || null,
                    questionnaireId: questionnaire.id,
                    questionKey: request.questionKey,
                    value: request.value,
                    valueType: request.valueType || "string",
                    isUnknown: request.isUnknown || false,
                    plannerVersion: "1.0",
                    questionnaireVersion: questionnaire.version,
                    branchPath,
                    timeSpentMs: request.timeSpentMs,
                },
            });
        }
        this.eventEmitter.emit("planner.answered", {
            buyerId,
            projectId,
            sessionId,
            questionKey: request.questionKey,
            value: request.value,
            questionnaireId: questionnaire.id,
            timestamp: new Date(),
        });
        const eventType = isChanged ? "changed" : "answered";
        await this.logAnalytics(projectId, questionnaire.id, request, eventType, sessionId);
        const state = await this.startPlanner({ questionnaireId: questionnaire.id }, projectId, buyerId, sessionId);
        if (state.isComplete && state.mandatoryComplete) {
            this.eventEmitter.emit("planner.completed", {
                buyerId,
                projectId,
                sessionId,
                questionnaireId: questionnaire.id,
                timestamp: new Date(),
            });
            await this.evaluateDecision(buyerId, projectId, sessionId, questionnaire);
        }
        return state;
    }
    async resumePlanner(projectId, buyerId, sessionId) {
        return this.startPlanner({}, projectId, buyerId, sessionId);
    }
    generatePreview(state) {
        const answers = new Map(state.answers.map((a) => [a.questionKey, a.value]));
        if (!this.isMandatoryComplete(this.defaultQuestionnaire.questions.filter((q) => q.isMandatory), state.completedQuestions)) {
            return null;
        }
        const household = answers.get("household") || "Couple";
        const hasChildren = ["Couple + Child", "Family", "Joint Family"].includes(household);
        const workFromHome = answers.get("work_from_home") || "Sometimes";
        const moveInTimeline = answers.get("move_in_timeline") || "6–12 Months";
        const priorities = answers.get("priorities") || [];
        const budget = answers.get("interior_budget") || 800000;
        const style = answers.get("interior_style") || "Modern Luxury";
        const budgetTier = budget >= 1500000 ? "premium" : budget >= 800000 ? "mid" : "budget";
        return {
            householdSize: this.getHouseholdSize(household),
            hasChildren,
            workFromHome,
            moveInMonths: this.parseTimeline(moveInTimeline),
            topPriorities: priorities.slice(0, 3),
            budgetTier,
            stylePreferences: [style],
            previewGenerated: true,
        };
    }
    getNextQuestion(mandatoryQuestions, adaptiveQuestions, completedQuestions, answeredMap) {
        for (const q of mandatoryQuestions) {
            if (!completedQuestions.includes(q.key)) {
                return q;
            }
        }
        for (const q of adaptiveQuestions) {
            if (completedQuestions.includes(q.key))
                continue;
            if (this.shouldAskQuestion(q, answeredMap)) {
                return q;
            }
        }
        return null;
    }
    shouldAskQuestion(question, answeredMap) {
        if (!question.dependsOn)
            return true;
        const { questionKey, operator, value } = question.dependsOn;
        const answer = answeredMap.get(questionKey)?.value;
        if (answer === undefined)
            return false;
        switch (operator) {
            case "eq":
                return answer === value;
            case "neq":
                return answer !== value;
            case "in":
                return Array.isArray(value) && value.includes(answer);
            case "contains":
                return Array.isArray(answer) && answer.includes(value);
            default:
                return true;
        }
    }
    getPendingQuestions(mandatoryQuestions, adaptiveQuestions, completedQuestions, answeredMap) {
        const pending = [];
        for (const q of mandatoryQuestions) {
            if (!completedQuestions.includes(q.key)) {
                pending.push(q.key);
            }
        }
        for (const q of adaptiveQuestions) {
            if (!completedQuestions.includes(q.key) &&
                this.shouldAskQuestion(q, answeredMap)) {
                pending.push(q.key);
            }
        }
        return pending.slice(0, 15 - completedQuestions.length);
    }
    calculateProgress(mandatoryQuestions, completedQuestions) {
        const completedMandatory = mandatoryQuestions.filter((q) => completedQuestions.includes(q.key)).length;
        return Math.round((completedMandatory / mandatoryQuestions.length) * 100);
    }
    isMandatoryComplete(mandatoryQuestions, completedQuestions) {
        return mandatoryQuestions.every((q) => completedQuestions.includes(q.key));
    }
    isComplete(mandatoryQuestions, adaptiveQuestions, completedQuestions, answeredMap) {
        if (!this.isMandatoryComplete(mandatoryQuestions, completedQuestions)) {
            return false;
        }
        const applicableAdaptive = adaptiveQuestions.filter((q) => this.shouldAskQuestion(q, answeredMap));
        return applicableAdaptive.every((q) => completedQuestions.includes(q.key));
    }
    async buildBranchPath(buyerId, projectId, sessionId) {
        const answers = await this.prisma.plannerAnswer.findMany({
            where: { buyerId, projectId, sessionId: sessionId || null },
            orderBy: { answeredAt: "asc" },
        });
        const path = [];
        for (const answer of answers) {
            path.push(`${answer.questionKey}=${JSON.stringify(answer.value)}`);
        }
        return path.join(" > ");
    }
    async isAnswerChanged(buyerId, projectId, questionnaireId, sessionId, request) {
        const existing = await this.prisma.plannerAnswer.findFirst({
            where: {
                buyerId,
                projectId,
                questionKey: request.questionKey,
                questionnaireId,
                sessionId: sessionId || null,
            },
        });
        if (!existing)
            return false;
        return JSON.stringify(existing.value) !== JSON.stringify(request.value);
    }
    async evaluateDecision(buyerId, projectId, sessionId, questionnaire) {
        try {
            const allAnswers = await this.prisma.plannerAnswer.findMany({
                where: { buyerId, projectId, sessionId: sessionId || null },
            });
            const answersMap = {};
            for (const a of allAnswers) {
                answersMap[a.questionKey] = a.value;
            }
            const snapshot = await this.prisma.decisionSnapshot.create({
                data: {
                    buyerId,
                    projectId,
                    sessionId: sessionId || null,
                    plannerVersion: "1.0",
                    questionnaireVersion: questionnaire.version,
                    normalizationVersion: "1.0",
                    decisionEngineVersion: "1.0",
                    facts: answersMap,
                    attributes: {},
                    priorityScores: {},
                    constraints: {},
                    metadata: { source: "adaptive-planner" },
                },
            });
            await this.decisionEngine.evaluate({
                id: snapshot.id,
                answers: answersMap,
            });
        }
        catch (error) {
            this.logger.error("Decision engine evaluation failed", error);
        }
    }
    getHouseholdSize(household) {
        const sizes = {
            "Just Me": 1,
            Couple: 2,
            "Couple + Child": 3,
            Family: 4,
            "Joint Family": 6,
            "Buying as Investment": 1,
        };
        return sizes[household] || 2;
    }
    parseTimeline(timeline) {
        const timelines = {
            Immediately: 0,
            "Within 3 Months": 2,
            "3–6 Months": 4,
            "6–12 Months": 9,
            "Just Exploring": 24,
        };
        return timelines[timeline] || 6;
    }
    mapToQuestionnaireDto(stored) {
        return {
            id: stored.id,
            name: stored.name,
            description: stored.description,
            version: stored.version,
            mandatoryCount: stored.mandatoryCount,
            maxQuestions: stored.maxQuestions,
            avgCompletionSecs: stored.avgCompletionSecs,
            questions: stored.questions.map((q) => ({
                key: q.key,
                label: q.label,
                type: q.type,
                category: q.category,
                isMandatory: q.isMandatory,
                order: q.order,
                options: q.options,
                minValue: q.minValue,
                maxValue: q.maxValue,
                step: q.step,
                unit: q.unit,
                dependsOn: q.dependsOn,
                branchKey: q.branchKey,
                metadata: q.metadata,
            })),
        };
    }
    async logAnalytics(projectId, questionnaireId, request, eventType, sessionId) {
        const anonymousId = `anon_${Buffer.from(`${projectId}-${sessionId || "temp"}`)
            .toString("base64")
            .slice(0, 16)}`;
        await this.prisma.plannerAnalytics.create({
            data: {
                projectId,
                questionnaireId,
                questionKey: request?.questionKey || "system",
                eventType,
                timeSpentMs: request?.timeSpentMs,
                answerChanged: false,
                dateBucket: new Date(),
                anonymousId,
            },
        });
    }
};
exports.AdaptivePlannerService = AdaptivePlannerService;
exports.AdaptivePlannerService = AdaptivePlannerService = AdaptivePlannerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2,
        decision_engine_service_1.DecisionEngineService])
], AdaptivePlannerService);
//# sourceMappingURL=adaptive-planner.service.js.map