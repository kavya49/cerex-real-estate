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
exports.BuyerSessionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
let BuyerSessionService = class BuyerSessionService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.accessTokenTtl = "15m";
        this.refreshTokenTtl = "7d";
    }
    async createSession(projectId, dto, ipAddress) {
        const buyer = await this.prisma.buyer.create({
            data: {
                projectId,
                email: `anon_${(0, uuid_1.v4)()}@cerex.local`,
                name: "Anonymous",
            },
        });
        const sessionId = (0, uuid_1.v4)();
        const accessTokenId = (0, uuid_1.v4)();
        const refreshToken = (0, uuid_1.v4)();
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.prisma.buyerSession.create({
            data: {
                id: sessionId,
                buyerId: buyer.id,
                projectId,
                accessTokenId,
                refreshTokenHash,
                expiresAt,
                lastSeenAt: new Date(),
                deviceInfo: null,
                ipAddress: ipAddress || null,
            },
        });
        const tokens = await this.generateTokens(buyer.id, sessionId, projectId);
        await this.updateSessionAccessToken(sessionId, tokens.accessToken);
        return {
            buyerId: buyer.id,
            sessionId,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            expiresIn: 15 * 60,
        };
    }
    async refreshSession(projectId, dto) {
        try {
            const payload = this.jwtService.verify(dto.refreshToken, {
                secret: this.configService.get("JWT_REFRESH_SECRET"),
            });
            if (payload.type !== "refresh") {
                throw new common_1.UnauthorizedException("Invalid token type");
            }
            const session = await this.prisma.buyerSession.findUnique({
                where: { id: payload.sessionId },
                include: { buyer: true },
            });
            if (!session) {
                throw new common_1.UnauthorizedException("Session not found");
            }
            if (session.projectId !== projectId) {
                throw new common_1.UnauthorizedException("Session does not belong to this project");
            }
            if (session.expiresAt < new Date()) {
                throw new common_1.UnauthorizedException("Session expired");
            }
            const isValid = await bcrypt.compare(dto.refreshToken, session.refreshTokenHash);
            if (!isValid) {
                throw new common_1.UnauthorizedException("Invalid refresh token");
            }
            const newRefreshToken = (0, uuid_1.v4)();
            const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
            await this.prisma.buyerSession.update({
                where: { id: session.id },
                data: {
                    refreshTokenHash: newRefreshTokenHash,
                    lastSeenAt: new Date(),
                },
            });
            const tokens = await this.generateTokens(session.buyerId, session.id, projectId);
            await this.updateSessionAccessToken(session.id, tokens.accessToken);
            return {
                buyerId: session.buyerId,
                sessionId: session.id,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                expiresIn: 15 * 60,
            };
        }
        catch (e) {
            if (e instanceof common_1.UnauthorizedException)
                throw e;
            throw new common_1.UnauthorizedException("Invalid or expired refresh token");
        }
    }
    async getSession(sessionId, projectId) {
        const session = await this.prisma.buyerSession.findUnique({
            where: { id: sessionId },
            include: { buyer: true },
        });
        if (!session || session.projectId !== projectId) {
            throw new common_1.NotFoundException("Session not found");
        }
        if (session.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException("Session expired");
        }
        return session;
    }
    async resumeSession(_projectId, _ipAddress) {
        return { message: "Use GET /buyer/session/me with valid access token" };
    }
    async generateTokens(buyerId, sessionId, projectId) {
        const accessPayload = {
            sub: buyerId,
            sessionId,
            projectId,
            type: "access",
        };
        const refreshPayload = {
            sub: buyerId,
            sessionId,
            projectId,
            type: "refresh",
        };
        const accessToken = this.jwtService.sign(accessPayload, {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: this.accessTokenTtl,
        });
        const refreshToken = this.jwtService.sign(refreshPayload, {
            secret: this.configService.get("JWT_REFRESH_SECRET"),
            expiresIn: this.refreshTokenTtl,
        });
        return { accessToken, refreshToken };
    }
    async updateSessionAccessToken(sessionId, _accessToken) {
        await this.prisma.buyerSession.update({
            where: { id: sessionId },
            data: { lastSeenAt: new Date() },
        });
    }
};
exports.BuyerSessionService = BuyerSessionService;
exports.BuyerSessionService = BuyerSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], BuyerSessionService);
//# sourceMappingURL=buyer-session.service.js.map