import { Injectable, BadRequestException } from "@nestjs/common";
import { NormalizePlannerRequestDto } from "./dto/normalization.dto";

@Injectable()
export class NormalizationValidator {
  private readonly requiredFields = [
    "familySize",
    "children",
    "workFromHome",
    "lifestyle",
    "timeline",
    "style",
    "budget",
  ];

  validate(request: NormalizePlannerRequestDto) {
    const missing: string[] = [];
    const invalid: string[] = [];

    for (const field of this.requiredFields) {
      const value = (request.answers as Record<string, any>)[field];
      if (value === undefined || value === null || value === "") {
        missing.push(field);
      }
    }

    if (missing.length > 0) {
      throw new BadRequestException({
        success: false,
        message: `Missing required planner answers: ${missing.join(", ")}`,
        missing,
      });
    }

    // Type checks
    if (typeof request.answers.familySize !== "string") {
      invalid.push("familySize must be string");
    }
    if (typeof request.answers.children !== "string") {
      invalid.push("children must be string");
    }
    if (typeof request.answers.workFromHome !== "string") {
      invalid.push("workFromHome must be string");
    }
    if (typeof request.answers.lifestyle !== "string") {
      invalid.push("lifestyle must be string");
    }
    if (typeof request.answers.timeline !== "string") {
      invalid.push("timeline must be string");
    }
    if (typeof request.answers.style !== "string") {
      invalid.push("style must be string");
    }
    if (typeof request.answers.budget !== "number") {
      invalid.push("budget must be number");
    }

    if (invalid.length > 0) {
      throw new BadRequestException({
        success: false,
        message: `Invalid planner answers: ${invalid.join(", ")}`,
        invalid,
      });
    }

    return true;
  }
}
