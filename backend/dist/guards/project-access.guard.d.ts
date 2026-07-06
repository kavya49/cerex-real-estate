import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class ProjectAccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
