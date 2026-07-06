import { Module } from "@nestjs/common";
import { BuyerSessionController } from "./buyer-session.controller";
import { BuyerSessionService } from "./buyer-session.service";
import { PrismaModule } from "../../prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "15m" },
      }),
    }),
  ],
  controllers: [BuyerSessionController],
  providers: [BuyerSessionService],
  exports: [BuyerSessionService],
})
export class BuyerSessionModule {}
