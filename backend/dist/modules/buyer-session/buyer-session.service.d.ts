import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { CreateBuyerSessionDto, RefreshBuyerSessionDto } from "./dto/buyer-session.dto";
export declare class BuyerSessionService {
    private prisma;
    private jwtService;
    private configService;
    private readonly accessTokenTtl;
    private readonly refreshTokenTtl;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    createSession(projectId: string, dto: CreateBuyerSessionDto, ipAddress?: string): Promise<{
        buyerId: string;
        sessionId: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    refreshSession(projectId: string, dto: RefreshBuyerSessionDto): Promise<{
        buyerId: string;
        sessionId: string;
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    getSession(sessionId: string, projectId: string): Promise<{
        buyer: {
            name: string | null;
            email: string;
            id: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            style: string | null;
            projectId: string;
            familySize: string | null;
            children: string | null;
            workFromHome: string | null;
            lifestyle: string | null;
            timeline: string | null;
            budget: number | null;
            selectedLayout: string | null;
            preferences: import("@prisma/client/runtime/library").JsonValue | null;
            dnaProfile: import("@prisma/client/runtime/library").JsonValue | null;
            leadInfo: import("@prisma/client/runtime/library").JsonValue | null;
            lastActiveAt: Date | null;
            apartmentId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        accessTokenId: string;
        buyerId: string;
        refreshTokenHash: string;
        expiresAt: Date;
        lastSeenAt: Date;
        deviceInfo: string | null;
        ipAddress: string | null;
    }>;
    resumeSession(_projectId: string, _ipAddress?: string): Promise<{
        message: string;
    }>;
    private generateTokens;
    private updateSessionAccessToken;
}
