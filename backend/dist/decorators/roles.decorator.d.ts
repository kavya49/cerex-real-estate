export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: string[]) => import("@nestjs/common").CustomDecorator<string>;
export declare const PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const PROJECT_ACCESS_KEY = "projectAccess";
export declare const RequireProjectAccess: () => import("@nestjs/common").CustomDecorator<string>;
export declare const RATE_LIMIT_KEY = "rateLimit";
export declare const RateLimit: (limit: number, ttl: number) => import("@nestjs/common").CustomDecorator<string>;
