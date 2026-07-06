"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const config_1 = require("@nestjs/config");
const validation_1 = require("./validation");
exports.configuration = (0, config_1.registerAs)("app", () => {
    const parsed = validation_1.validationSchema.safeParse(process.env);
    if (!parsed.success) {
        console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
        throw new Error("Invalid environment configuration");
    }
    return parsed.data;
});
//# sourceMappingURL=configuration.js.map