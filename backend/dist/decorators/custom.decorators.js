"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentSession = exports.CurrentBuyer = exports.IpAddress = exports.UserAgent = exports.ProjectSlug = exports.ProjectId = exports.CurrentProject = exports.CurrentUser = void 0;
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
    return request.headers["x-project-id"] || request.project?.id;
});
exports.ProjectSlug = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers["x-project-slug"] || request.project?.slug;
});
exports.UserAgent = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers["user-agent"];
});
exports.IpAddress = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.ip || request.connection?.remoteAddress;
});
exports.CurrentBuyer = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const buyer = request.buyer;
    return data ? buyer?.[data] : buyer;
});
exports.CurrentSession = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const session = request.session;
    return data ? session?.[data] : session;
});
//# sourceMappingURL=custom.decorators.js.map