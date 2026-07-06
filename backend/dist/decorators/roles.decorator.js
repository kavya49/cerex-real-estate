"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimit = exports.RATE_LIMIT_KEY = exports.RequireProjectAccess = exports.PROJECT_ACCESS_KEY = exports.Public = exports.PUBLIC_KEY = exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = "roles";
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
exports.PUBLIC_KEY = "isPublic";
const Public = () => (0, common_1.SetMetadata)(exports.PUBLIC_KEY, true);
exports.Public = Public;
exports.PROJECT_ACCESS_KEY = "projectAccess";
const RequireProjectAccess = () => (0, common_1.SetMetadata)(exports.PROJECT_ACCESS_KEY, true);
exports.RequireProjectAccess = RequireProjectAccess;
exports.RATE_LIMIT_KEY = "rateLimit";
const RateLimit = (limit, ttl) => (0, common_1.SetMetadata)(exports.RATE_LIMIT_KEY, { limit, ttl });
exports.RateLimit = RateLimit;
//# sourceMappingURL=roles.decorator.js.map