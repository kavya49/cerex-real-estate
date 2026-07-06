import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";
import { LoginDto, RegisterDto, ResetPasswordDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.developer.findUnique({
      where: { email: loginDto.email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!user.isActive) {
      throw new UnauthorizedException("Account is deactivated");
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.prisma.developer.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already registered");
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

  async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      });

      const user = await this.prisma.developer.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException("Invalid refresh token");
      }

      const tokens = await this.generateTokens(user.id, user.email, user.role);
      await this.updateRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.developer.findUnique({ where: { email } });
    if (!user) {
      return { message: "If the email exists, a reset link will be sent" };
    }

    const resetToken = this.jwtService.sign(
      { sub: user.id, type: "password-reset" },
      { secret: this.configService.get<string>("JWT_SECRET"), expiresIn: "1h" },
    );

    // TODO: Send email with reset token
    console.log(`Password reset token for ${email}: ${resetToken}`);

    return { message: "If the email exists, a reset link will be sent" };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        resetPasswordDto.token,
        {
          secret: this.configService.get<string>("JWT_SECRET"),
        },
      );

      if (payload.type !== "password-reset") {
        throw new UnauthorizedException("Invalid reset token");
      }

      const passwordHash = await bcrypt.hash(resetPasswordDto.password, 12);
      await this.prisma.developer.update({
        where: { id: payload.sub },
        data: { passwordHash },
      });

      return { message: "Password reset successful" };
    } catch {
      throw new UnauthorizedException("Invalid or expired reset token");
    }
  }

  async getProfile(userId: string) {
    const user = await this.prisma.developer.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    return this.sanitizeUser(user);
  }

  async logout(userId: string) {
    await this.prisma.developer.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { message: "Logged out successfully" };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, email, role },
      {
        secret: this.configService.get<string>("JWT_SECRET"),
        expiresIn: this.configService.get<string>("JWT_EXPIRES_IN", "15m"),
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId, type: "refresh" },
      {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
        expiresIn: this.configService.get<string>(
          "JWT_REFRESH_EXPIRES_IN",
          "7d",
        ),
      },
    );

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.developer.update({
      where: { id: userId },
      data: { refreshToken: hashedToken },
    });
  }

  private sanitizeUser(user: any) {
    const sanitized = { ...user };
    delete sanitized.passwordHash;
    delete sanitized.refreshToken;
    return sanitized;
  }
}
