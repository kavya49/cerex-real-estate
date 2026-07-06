import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "../../prisma/prisma.service";
import { DecisionEngineService } from "../decision-engine/decision-engine.service";
import {
  QuestionnaireDto,
  QuestionnaireQuestionDto,
  PlannerStateDto,
  PlannerPreviewDto,
  StartPlannerRequestDto,
  SubmitAnswerRequestDto,
  PlannerAnswerRequestDto,
} from "./dto/adaptive-planner.dto";

@Injectable()
export class AdaptivePlannerService {
  private readonly logger = new Logger(AdaptivePlannerService.name);

  // Default questionnaire with 6 mandatory questions + adaptive branches
  private readonly defaultQuestionnaire: QuestionnaireDto = {
    id: "default-v1",
    name: "Default Questionnaire v1",
    description: "Standard adaptive questionnaire for home buyers",
    version: "1.0",
    mandatoryCount: 6,
    maxQuestions: 15,
    avgCompletionSecs: 75,
    questions: [
      // MANDATORY QUESTIONS (1-6)
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
      // ADAPTIVE QUESTIONS (7-15)
      // Household branch
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
      // Lifestyle branch
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
      // Design branch
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
      // Financial/Investment branch
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

  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private decisionEngine: DecisionEngineService,
  ) {}

  async getQuestionnaire(questionnaireId?: string): Promise<QuestionnaireDto> {
    if (!questionnaireId || questionnaireId === "default-v1") {
      return this.defaultQuestionnaire;
    }

    const stored = await this.prisma.questionnaire.findUnique({
      where: { id: questionnaireId },
      include: { questions: true },
    });

    if (!stored) {
      throw new NotFoundException(`Questionnaire ${questionnaireId} not found`);
    }

    return this.mapToQuestionnaireDto(stored);
  }

  async startPlanner(
    request: StartPlannerRequestDto,
    projectId: string,
    buyerId: string,
    sessionId?: string,
  ): Promise<PlannerStateDto> {
    const questionnaire = await this.getQuestionnaire(request.questionnaireId);

    // Get mandatory questions first
    const mandatoryQuestions = questionnaire.questions
      .filter((q) => q.isMandatory)
      .sort((a, b) => a.order - b.order);

    // Get adaptive questions
    const adaptiveQuestions = questionnaire.questions
      .filter((q) => !q.isMandatory)
      .sort((a, b) => a.order - b.order);

    // Check for existing session - this is a new start
    const existingAnswers = await this.prisma.plannerAnswer.findMany({
      where: { buyerId, projectId, sessionId: sessionId || null },
      orderBy: { answeredAt: "asc" },
    });

    const completedQuestions = existingAnswers.map((a) => a.questionKey);
    const answeredMap = new Map(existingAnswers.map((a) => [a.questionKey, a]));

    // Emit planner.started only if no answers exist yet
    if (existingAnswers.length === 0) {
      this.eventEmitter.emit("planner.started", {
        buyerId,
        projectId,
        sessionId,
        questionnaireId: questionnaire.id,
        timestamp: new Date(),
      });

      await this.logAnalytics(
        projectId,
        questionnaire.id,
        null as any,
        "started",
        sessionId,
      );
    }

    // Determine next question
    const currentQuestion = this.getNextQuestion(
      mandatoryQuestions,
      adaptiveQuestions,
      completedQuestions,
      answeredMap,
    );

    const state: PlannerStateDto = {
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
      pendingQuestions: this.getPendingQuestions(
        mandatoryQuestions,
        adaptiveQuestions,
        completedQuestions,
        answeredMap,
      ),
      currentQuestion: currentQuestion?.key || null,
      progress: this.calculateProgress(mandatoryQuestions, completedQuestions),
      isComplete: this.isComplete(
        mandatoryQuestions,
        adaptiveQuestions,
        completedQuestions,
        answeredMap,
      ),
      mandatoryComplete: this.isMandatoryComplete(
        mandatoryQuestions,
        completedQuestions,
      ),
      branchPath: await this.buildBranchPath(buyerId, projectId, sessionId),
      startedAt: existingAnswers[0]?.answeredAt || new Date(),
      updatedAt: new Date(),
    };

    return state;
  }

  async submitAnswer(
    projectId: string,
    buyerId: string,
    sessionId: string | undefined,
    request: SubmitAnswerRequestDto,
  ): Promise<PlannerStateDto> {
    const questionnaire = await this.getQuestionnaire();

    const isChanged = await this.isAnswerChanged(
      buyerId,
      projectId,
      questionnaire.id,
      sessionId,
      request,
    );

    // Save answer using findFirst + create/update since no unique constraint
    const existing = await this.prisma.plannerAnswer.findFirst({
      where: {
        buyerId,
        projectId,
        questionKey: request.questionKey,
        questionnaireId: questionnaire.id,
        sessionId: sessionId || null,
      },
    });

    const branchPath = await this.buildBranchPath(
      buyerId,
      projectId,
      sessionId,
    );

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
    } else {
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

    // Emit planner.answered event
    this.eventEmitter.emit("planner.answered", {
      buyerId,
      projectId,
      sessionId,
      questionKey: request.questionKey,
      value: request.value,
      questionnaireId: questionnaire.id,
      timestamp: new Date(),
    });

    // Log analytics
    const eventType = isChanged ? "changed" : "answered";
    await this.logAnalytics(
      projectId,
      questionnaire.id,
      request,
      eventType,
      sessionId,
    );

    // Return updated state
    const state = await this.startPlanner(
      { questionnaireId: questionnaire.id },
      projectId,
      buyerId,
      sessionId,
    );

    // If planner just completed, emit planner.completed and run decision engine
    if (state.isComplete && state.mandatoryComplete) {
      this.eventEmitter.emit("planner.completed", {
        buyerId,
        projectId,
        sessionId,
        questionnaireId: questionnaire.id,
        timestamp: new Date(),
      });

      // Run decision engine evaluation
      await this.evaluateDecision(buyerId, projectId, sessionId, questionnaire);
    }

    return state;
  }

  async resumePlanner(
    projectId: string,
    buyerId: string,
    sessionId: string,
  ): Promise<PlannerStateDto> {
    return this.startPlanner({}, projectId, buyerId, sessionId);
  }

  generatePreview(state: PlannerStateDto): PlannerPreviewDto | null {
    const answers = new Map(state.answers.map((a) => [a.questionKey, a.value]));

    if (
      !this.isMandatoryComplete(
        this.defaultQuestionnaire.questions.filter((q) => q.isMandatory),
        state.completedQuestions,
      )
    ) {
      return null;
    }

    const household = answers.get("household") || "Couple";
    const hasChildren = ["Couple + Child", "Family", "Joint Family"].includes(
      household,
    );
    const workFromHome = answers.get("work_from_home") || "Sometimes";
    const moveInTimeline = answers.get("move_in_timeline") || "6–12 Months";
    const priorities = (answers.get("priorities") as string[]) || [];
    const budget = answers.get("interior_budget") || 800000;
    const style = answers.get("interior_style") || "Modern Luxury";

    const budgetTier =
      budget >= 1500000 ? "premium" : budget >= 800000 ? "mid" : "budget";

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

  private getNextQuestion(
    mandatoryQuestions: QuestionnaireQuestionDto[],
    adaptiveQuestions: QuestionnaireQuestionDto[],
    completedQuestions: string[],
    answeredMap: Map<string, any>,
  ): QuestionnaireQuestionDto | null {
    // First, find incomplete mandatory questions
    for (const q of mandatoryQuestions) {
      if (!completedQuestions.includes(q.key)) {
        return q;
      }
    }

    // Then, find applicable adaptive questions
    for (const q of adaptiveQuestions) {
      if (completedQuestions.includes(q.key)) continue;
      if (this.shouldAskQuestion(q, answeredMap)) {
        return q;
      }
    }

    return null;
  }

  private shouldAskQuestion(
    question: QuestionnaireQuestionDto,
    answeredMap: Map<string, any>,
  ): boolean {
    if (!question.dependsOn) return true;

    const { questionKey, operator, value } = question.dependsOn;
    const answer = answeredMap.get(questionKey)?.value;

    if (answer === undefined) return false;

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

  private getPendingQuestions(
    mandatoryQuestions: QuestionnaireQuestionDto[],
    adaptiveQuestions: QuestionnaireQuestionDto[],
    completedQuestions: string[],
    answeredMap: Map<string, any>,
  ): string[] {
    const pending: string[] = [];

    for (const q of mandatoryQuestions) {
      if (!completedQuestions.includes(q.key)) {
        pending.push(q.key);
      }
    }

    for (const q of adaptiveQuestions) {
      if (
        !completedQuestions.includes(q.key) &&
        this.shouldAskQuestion(q, answeredMap)
      ) {
        pending.push(q.key);
      }
    }

    return pending.slice(0, 15 - completedQuestions.length);
  }

  private calculateProgress(
    mandatoryQuestions: QuestionnaireQuestionDto[],
    completedQuestions: string[],
  ): number {
    const completedMandatory = mandatoryQuestions.filter((q) =>
      completedQuestions.includes(q.key),
    ).length;
    return Math.round((completedMandatory / mandatoryQuestions.length) * 100);
  }

  private isMandatoryComplete(
    mandatoryQuestions: QuestionnaireQuestionDto[],
    completedQuestions: string[],
  ): boolean {
    return mandatoryQuestions.every((q) => completedQuestions.includes(q.key));
  }

  private isComplete(
    mandatoryQuestions: QuestionnaireQuestionDto[],
    adaptiveQuestions: QuestionnaireQuestionDto[],
    completedQuestions: string[],
    answeredMap: Map<string, any>,
  ): boolean {
    if (!this.isMandatoryComplete(mandatoryQuestions, completedQuestions)) {
      return false;
    }

    // Check if all applicable adaptive questions are answered
    const applicableAdaptive = adaptiveQuestions.filter((q) =>
      this.shouldAskQuestion(q, answeredMap),
    );
    return applicableAdaptive.every((q) => completedQuestions.includes(q.key));
  }

  private async buildBranchPath(
    buyerId: string,
    projectId: string,
    sessionId?: string,
  ): Promise<string> {
    const answers = await this.prisma.plannerAnswer.findMany({
      where: { buyerId, projectId, sessionId: sessionId || null },
      orderBy: { answeredAt: "asc" },
    });
    const path: string[] = [];
    for (const answer of answers) {
      path.push(`${answer.questionKey}=${JSON.stringify(answer.value)}`);
    }
    return path.join(" > ");
  }

  private async isAnswerChanged(
    buyerId: string,
    projectId: string,
    questionnaireId: string,
    sessionId: string | undefined,
    request: SubmitAnswerRequestDto,
  ): Promise<boolean> {
    const existing = await this.prisma.plannerAnswer.findFirst({
      where: {
        buyerId,
        projectId,
        questionKey: request.questionKey,
        questionnaireId,
        sessionId: sessionId || null,
      },
    });
    if (!existing) return false;
    return JSON.stringify(existing.value) !== JSON.stringify(request.value);
  }

  private async evaluateDecision(
    buyerId: string,
    projectId: string,
    sessionId: string | undefined,
    questionnaire: QuestionnaireDto,
  ) {
    try {
      const allAnswers = await this.prisma.plannerAnswer.findMany({
        where: { buyerId, projectId, sessionId: sessionId || null },
      });

      const answersMap: Record<string, any> = {};
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
          facts: answersMap as any,
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
    } catch (error) {
      this.logger.error("Decision engine evaluation failed", error);
    }
  }

  private getHouseholdSize(household: string): number {
    const sizes: Record<string, number> = {
      "Just Me": 1,
      Couple: 2,
      "Couple + Child": 3,
      Family: 4,
      "Joint Family": 6,
      "Buying as Investment": 1,
    };
    return sizes[household] || 2;
  }

  private parseTimeline(timeline: string): number {
    const timelines: Record<string, number> = {
      Immediately: 0,
      "Within 3 Months": 2,
      "3–6 Months": 4,
      "6–12 Months": 9,
      "Just Exploring": 24,
    };
    return timelines[timeline] || 6;
  }

  private mapToQuestionnaireDto(stored: any): QuestionnaireDto {
    return {
      id: stored.id,
      name: stored.name,
      description: stored.description,
      version: stored.version,
      mandatoryCount: stored.mandatoryCount,
      maxQuestions: stored.maxQuestions,
      avgCompletionSecs: stored.avgCompletionSecs,
      questions: stored.questions.map((q: any) => ({
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

  private async logAnalytics(
    projectId: string,
    questionnaireId: string,
    request: SubmitAnswerRequestDto | null,
    eventType: string,
    sessionId?: string,
  ) {
    const anonymousId = `anon_${Buffer.from(
      `${projectId}-${sessionId || "temp"}`,
    )
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
}
