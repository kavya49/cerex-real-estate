"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerSessionModule = void 0;
const common_1 = require("@nestjs/common");
const buyer_session_controller_1 = require("./buyer-session.controller");
const buyer_session_service_1 = require("./buyer-session.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let BuyerSessionModule = class BuyerSessionModule {
};
exports.BuyerSessionModule = BuyerSessionModule;
exports.BuyerSessionModule = BuyerSessionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get("JWT_SECRET"),
                    signOptions: { expiresIn: "15m" },
                }),
            }),
        ],
        controllers: [buyer_session_controller_1.BuyerSessionController],
        providers: [buyer_session_service_1.BuyerSessionService],
        exports: [buyer_session_service_1.BuyerSessionService],
    })
], BuyerSessionModule);
//# sourceMappingURL=buyer-session.module.js.map