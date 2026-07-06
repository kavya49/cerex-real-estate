import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";

interface TokenPayload {
  sub: string;
  sessionId: string;
  projectId: string;
  type: "access" | "refresh";
}

@Injectable()
export class BuyerSessionGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("No access token provided");
    }

    try {
      const payload = this.jwtService.verify<TokenPayload>(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });

      if (payload.type !== "access") {
        throw new UnauthorizedException("Invalid token type");
      }

      const session = await this.prisma.buyerSession.findUnique({
        where: { id: payload.sessionId },
        include: { buyer: true },
      });

      if (!session) {
        throw new UnauthorizedException("Session not found");
      }

      if (session.projectId !== payload.projectId) {
        throw new UnauthorizedException(
          "Session does not belong to this project",
        );
      }

      if (session.expiresAt < new Date()) {
        throw new UnauthorizedException("Session expired");
      }

      // Attach to request for use in controller
      request.buyer = session.buyer;
      request.session = session;
      request.tokenPayload = payload;

      return true;
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      throw new UnauthorizedException("Invalid or expired access token");
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
