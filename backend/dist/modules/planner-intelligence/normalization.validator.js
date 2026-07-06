"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NormalizationValidator = void 0;
const common_1 = require("@nestjs/common");
let NormalizationValidator = class NormalizationValidator {
    constructor() {
        this.requiredFields = [
            "familySize",
            "children",
            "workFromHome",
            "lifestyle",
            "timeline",
            "style",
            "budget",
        ];
    }
    validate(request) {
        const missing = [];
        const invalid = [];
        for (const field of this.requiredFields) {
            const value = request.answers[field];
            if (value === undefined || value === null || value === "") {
                missing.push(field);
            }
        }
        if (missing.length > 0) {
            throw new common_1.BadRequestException({
                success: false,
                message: `Missing required planner answers: ${missing.join(", ")}`,
                missing,
            });
        }
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
            throw new common_1.BadRequestException({
                success: false,
                message: `Invalid planner answers: ${invalid.join(", ")}`,
                invalid,
            });
        }
        return true;
    }
};
exports.NormalizationValidator = NormalizationValidator;
exports.NormalizationValidator = NormalizationValidator = __decorate([
    (0, common_1.Injectable)()
], NormalizationValidator);
//# sourceMappingURL=normalization.validator.js.map