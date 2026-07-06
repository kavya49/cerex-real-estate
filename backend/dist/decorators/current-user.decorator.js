"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperId = exports.ProjectSlug = exports.ProjectId = exports.CurrentProject = exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
});
exports.CurrentProject = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const project = request.project;
    return data ? project?.[data] : project;
});
exports.ProjectId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.project?.projectId;
});
exports.ProjectSlug = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.project?.projectSlug;
});
exports.DeveloperId = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.project?.developerId || request.user?.developerId;
});
//# sourceMappingURL=current-user.decorator.js.map