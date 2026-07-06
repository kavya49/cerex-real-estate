import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : "Internal server error";

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof message === "string"
          ? message
          : (message as any).message || "Internal server error",
      error:
        exception instanceof HttpException
          ? exception.name
          : "InternalServerError",
    };

    if (exception instanceof PrismaClientKnownRequestError) {
      errorResponse.message = this.handlePrismaError(exception);
      errorResponse.error = "DatabaseError";
    }

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${JSON.stringify(errorResponse)}`,
      exception,
    );

    response.status(status).json(errorResponse);
  }

  private handlePrismaError(error: PrismaClientKnownRequestError): string {
    switch (error.code) {
      case "P2002":
        return "A record with this value already exists";
      case "P2025":
        return "Record not found";
      case "P2003":
        return "Foreign key constraint failed";
      default:
        return "Database operation failed";
    }
  }
}
