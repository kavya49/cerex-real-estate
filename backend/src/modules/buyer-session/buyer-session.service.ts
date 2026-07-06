import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import {
  CreateBuyerSessionDto,
  RefreshBuyerSessionDto,
} from "./dto/buyer-session.dto";

interface TokenPayload {
  sub: string; // buyerId
  sessionId: string;
  projectId: string;
  type: "access" | "refresh";
}

@Injectable()
export class BuyerSessionService {
  private readonly accessTokenTtl = "15m";
  private readonly refreshTokenTtl = "7d";

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createSession(
    projectId: string,
    dto: CreateBuyerSessionDto,
    ipAddress?: string,
  ) {
    // Create anonymous buyer
    const buyer = await this.prisma.buyer.create({
      data: {
        projectId,
        email: `anon_${uuidv4()}@cerex.local`, // placeholder email
        name: "Anonymous",
      },
    });

    // Create session record
    const sessionId = uuidv4();
    const accessTokenId = uuidv4();
    const refreshToken = uuidv4();
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.prisma.buyerSession.create({
      data: {
        id: sessionId,
        buyerId: buyer.id,
        projectId,
        accessTokenId,
        refreshTokenHash,
        expiresAt,
        lastSeenAt: new Date(),
        deviceInfo: null, // TODO: parse from dto.deviceInfo
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
      expiresIn: 15 * 60, // 15 minutes in seconds
    };
  }

  async refreshSession(projectId: string, dto: RefreshBuyerSessionDto) {
    try {
      const payload = this.jwtService.verify<TokenPayload>(dto.refreshToken, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      });

      if (payload.type !== "refresh") {
        throw new UnauthorizedException("Invalid token type");
      }

      const session = await this.prisma.buyerSession.findUnique({
        where: { id: payload.sessionId },
        include: { buyer: true },
      });

      if (!session) {
        throw new UnauthorizedException("Session not found");
      }

      if (session.projectId !== projectId) {
        throw new UnauthorizedException(
          "Session does not belong to this project",
        );
      }

      if (session.expiresAt < new Date()) {
        throw new UnauthorizedException("Session expired");
      }

      const isValid = await bcrypt.compare(
        dto.refreshToken,
        session.refreshTokenHash,
      );
      if (!isValid) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      // Rotate refresh token
      const newRefreshToken = uuidv4();
      const newRefreshTokenHash = await bcrypt.hash(newRefreshToken, 10);

      await this.prisma.buyerSession.update({
        where: { id: session.id },
        data: {
          refreshTokenHash: newRefreshTokenHash,
          lastSeenAt: new Date(),
        },
      });

      const tokens = await this.generateTokens(
        session.buyerId,
        session.id,
        projectId,
      );
      await this.updateSessionAccessToken(session.id, tokens.accessToken);

      return {
        buyerId: session.buyerId,
        sessionId: session.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        expiresIn: 15 * 60,
      };
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      throw new UnauthorizedException("Invalid or expired refresh token");
    }
  }

  async getSession(sessionId: string, projectId: string) {
    const session = await this.prisma.buyerSession.findUnique({
      where: { id: sessionId },
      include: { buyer: true },
    });

    if (!session || session.projectId !== projectId) {
      throw new NotFoundException("Session not found");
    }

    if (session.expiresAt < new Date()) {
      throw new UnauthorizedException("Session expired");
    }

    return session;
  }

  async resumeSession(_projectId: string, _ipAddress?: string) {
    // This endpoint would be called with a valid access token
    // The guard will validate the token and attach session to request
    // This method just returns the buyer profile
    // Actual validation happens in guard
    return { message: "Use GET /buyer/session/me with valid access token" };
  }

  private async generateTokens(
    buyerId: string,
    sessionId: string,
    projectId: string,
  ) {
    const accessPayload: TokenPayload = {
      sub: buyerId,
      sessionId,
      projectId,
      type: "access",
    };

    const refreshPayload: TokenPayload = {
      sub: buyerId,
      sessionId,
      projectId,
      type: "refresh",
    };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: this.configService.get<string>("JWT_SECRET"),
      expiresIn: this.accessTokenTtl,
    });

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: this.refreshTokenTtl,
    });

    return { accessToken, refreshToken };
  }

  private async updateSessionAccessToken(
    sessionId: string,
    _accessToken: string,
  ) {
    // We could store the latest access token ID if needed for revocation
    // For now, just update lastSeenAt
    await this.prisma.buyerSession.update({
      where: { id: sessionId },
      data: { lastSeenAt: new Date() },
    });
  }
}
