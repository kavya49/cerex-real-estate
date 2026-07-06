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
exports.ViewerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ViewerService = class ViewerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getModels(_projectId) {
        return [
            {
                id: "modern-luxury",
                name: "Modern Luxury",
                url: "/models/modern-luxury.glb",
            },
            { id: "family", name: "Family Layout", url: "/models/family.glb" },
            { id: "office", name: "Home Office Layout", url: "/models/office.glb" },
            {
                id: "balcony",
                name: "Balcony Lifestyle Layout",
                url: "/models/balcony.glb",
            },
        ];
    }
    async getModel(_projectId, modelId) {
        const models = await this.getModels(_projectId);
        const model = models.find((m) => m.id === modelId);
        if (!model)
            throw new common_1.NotFoundException("Model not found");
        return model;
    }
};
exports.ViewerService = ViewerService;
exports.ViewerService = ViewerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ViewerService);
//# sourceMappingURL=viewer.service.js.map