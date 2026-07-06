import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class ProjectAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.project) {
      throw new ForbiddenException("Project context required");
    }

    const user = request.user;
    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }

    if (user.developerId && user.developerId !== request.project.developerId) {
      throw new ForbiddenException("Access denied to this project");
    }

    return true;
  }
}
