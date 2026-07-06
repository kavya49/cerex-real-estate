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
exports.BuyerSessionGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
let BuyerSessionGuard = class BuyerSessionGuard {
    constructor(jwtService, configService, prisma) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException("No access token provided");
        }
        try {
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get("JWT_SECRET"),
            });
            if (payload.type !== "access") {
                throw new common_1.UnauthorizedException("Invalid token type");
            }
            const session = await this.prisma.buyerSession.findUnique({
                where: { id: payload.sessionId },
                include: { buyer: true },
            });
            if (!session) {
                throw new common_1.UnauthorizedException("Session not found");
            }
            if (session.projectId !== payload.projectId) {
                throw new common_1.UnauthorizedException("Session does not belong to this project");
            }
            if (session.expiresAt < new Date()) {
                throw new common_1.UnauthorizedException("Session expired");
            }
            request.buyer = session.buyer;
            request.session = session;
            request.tokenPayload = payload;
            return true;
        }
        catch (e) {
            if (e instanceof common_1.UnauthorizedException)
                throw e;
            throw new common_1.UnauthorizedException("Invalid or expired access token");
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.BuyerSessionGuard = BuyerSessionGuard;
exports.BuyerSessionGuard = BuyerSessionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], BuyerSessionGuard);
//# sourceMappingURL=buyer-session.guard.js.map