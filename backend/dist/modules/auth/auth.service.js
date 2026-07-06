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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(loginDto) {
        const user = await this.prisma.developer.findUnique({
            where: { email: loginDto.email },
        });
        if (!user || !user.passwordHash) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException("Account is deactivated");
        }
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
        };
    }
    async register(registerDto) {
        const existingUser = await this.prisma.developer.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException("Email already registered");
        }
        const passwordHash = await bcrypt.hash(registerDto.password, 12);
        const user = await this.prisma.developer.create({
            data: {
                email: registerDto.email,
                passwordHash,
                name: registerDto.name,
                companyName: registerDto.companyName,
                phone: registerDto.phone,
                role: "developer",
            },
        });
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            user: this.sanitizeUser(user),
            ...tokens,
        };
    }
    async refreshTokens(refreshToken) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get("JWT_REFRESH_SECRET"),
            });
            const user = await this.prisma.developer.findUnique({
                where: { id: payload.sub },
            });
            if (!user || user.refreshToken !== refreshToken) {
                throw new common_1.UnauthorizedException("Invalid refresh token");
            }
            const tokens = await this.generateTokens(user.id, user.email, user.role);
            await this.updateRefreshToken(user.id, tokens.refreshToken);
            return tokens;
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid refresh token");
        }
    }
    async forgotPassword(email) {
        const user = await this.prisma.developer.findUnique({ where: { email } });
        if (!user) {
            return { message: "If the email exists, a reset link will be sent" };
        }
        const resetToken = this.jwtService.sign({ sub: user.id, type: "password-reset" }, { secret: this.configService.get("JWT_SECRET"), expiresIn: "1h" });
        console.log(`Password reset token for ${email}: ${resetToken}`);
        return { message: "If the email exists, a reset link will be sent" };
    }
    async resetPassword(resetPasswordDto) {
        try {
            const payload = await this.jwtService.verifyAsync(resetPasswordDto.token, {
                secret: this.configService.get("JWT_SECRET"),
            });
            if (payload.type !== "password-reset") {
                throw new common_1.UnauthorizedException("Invalid reset token");
            }
            const passwordHash = await bcrypt.hash(resetPasswordDto.password, 12);
            await this.prisma.developer.update({
                where: { id: payload.sub },
                data: { passwordHash },
            });
            return { message: "Password reset successful" };
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid or expired reset token");
        }
    }
    async getProfile(userId) {
        const user = await this.prisma.developer.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        return this.sanitizeUser(user);
    }
    async logout(userId) {
        await this.prisma.developer.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        return { message: "Logged out successfully" };
    }
    async generateTokens(userId, email, role) {
        const accessToken = this.jwtService.sign({ sub: userId, email, role }, {
            secret: this.configService.get("JWT_SECRET"),
            expiresIn: this.configService.get("JWT_EXPIRES_IN", "15m"),
        });
        const refreshToken = this.jwtService.sign({ sub: userId, type: "refresh" }, {
            secret: this.configService.get("JWT_REFRESH_SECRET"),
            expiresIn: this.configService.get("JWT_REFRESH_EXPIRES_IN", "7d"),
        });
        return { accessToken, refreshToken };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedToken = await bcrypt.hash(refreshToken, 10);
        await this.prisma.developer.update({
            where: { id: userId },
            data: { refreshToken: hashedToken },
        });
    }
    sanitizeUser(user) {
        const sanitized = { ...user };
        delete sanitized.passwordHash;
        delete sanitized.refreshToken;
        return sanitized;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map