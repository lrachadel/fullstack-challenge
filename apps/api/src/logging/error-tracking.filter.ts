import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomLoggerService } from './logger.service';

interface ErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
  error?: string;
  requestId?: string;
}

@Catch()
export class ErrorTrackingFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId = response.getHeader('X-Request-Id') as string;

    let status: number;
    let message: string | string[];
    let error: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message =
          (responseObj.message as string | string[]) || exception.message;
        error = responseObj.error as string | undefined;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      error = exception.message;

      // Log the full error for internal tracking
      this.logger.logError(exception, 'ErrorTrackingFilter', {
        path: request.url,
        method: request.method,
        requestId,
      });
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const errorResponse: ErrorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
      requestId,
    };

    // Log error details
    this.logger.logWithData(
      status >= 500 ? 'error' : 'warn',
      `${request.method} ${request.url} failed with status ${status}`,
      {
        statusCode: status,
        path: request.url,
        method: request.method,
        message,
        error,
        requestId,
        stack: exception instanceof Error ? exception.stack : undefined,
      },
      'ErrorTrackingFilter',
    );

    response.status(status).json(errorResponse);
  }
}
