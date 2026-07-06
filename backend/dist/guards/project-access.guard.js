"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectAccessGuard = void 0;
const common_1 = require("@nestjs/common");
let ProjectAccessGuard = class ProjectAccessGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.project) {
            throw new common_1.ForbiddenException("Project context required");
        }
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException("User not authenticated");
        }
        if (user.developerId && user.developerId !== request.project.developerId) {
            throw new common_1.ForbiddenException("Access denied to this project");
        }
        return true;
    }
};
exports.ProjectAccessGuard = ProjectAccessGuard;
exports.ProjectAccessGuard = ProjectAccessGuard = __decorate([
    (0, common_1.Injectable)()
], ProjectAccessGuard);
//# sourceMappingURL=project-access.guard.js.map