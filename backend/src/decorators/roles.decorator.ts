import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export const PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(PUBLIC_KEY, true);

export const PROJECT_ACCESS_KEY = "projectAccess";
export const RequireProjectAccess = () => SetMetadata(PROJECT_ACCESS_KEY, true);

export const RATE_LIMIT_KEY = "rateLimit";
export const RateLimit = (limit: number, ttl: number) =>
  SetMetadata(RATE_LIMIT_KEY, { limit, ttl });
