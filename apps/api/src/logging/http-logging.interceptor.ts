import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CustomLoggerService } from './logger.service';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestId = uuidv4();
    const startTime = Date.now();

    // Add request ID to headers for tracing
    response.setHeader('X-Request-Id', requestId);

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.logHttpRequest({
            method: request.method,
            url: request.originalUrl || request.url,
            statusCode: response.statusCode,
            duration,
            userAgent: request.get('user-agent'),
            ip: request.ip || request.socket?.remoteAddress,
            requestId,
          });
        },
        error: (error: { status?: number }) => {
          const duration = Date.now() - startTime;
          this.logger.logHttpRequest({
            method: request.method,
            url: request.originalUrl || request.url,
            statusCode: error.status ?? 500,
            duration,
            userAgent: request.get('user-agent'),
            ip: request.ip || request.socket?.remoteAddress,
            requestId,
          });
        },
      }),
    );
  }
}
