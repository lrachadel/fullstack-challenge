import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface LogEntry {
  timestamp: string;
  level: string;
  context?: string;
  message: string;
  data?: Record<string, any>;
  trace?: string;
}

@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly logLevels: LogLevel[] = [
    'error',
    'warn',
    'log',
    'debug',
    'verbose',
  ];
  private readonly currentLogLevel: LogLevel;
  private readonly logToFile: boolean;
  private readonly logFilePath: string;

  constructor() {
    this.currentLogLevel = (process.env.LOG_LEVEL as LogLevel) || 'log';
    this.logToFile = process.env.LOG_TO_FILE === 'true';
    this.logFilePath =
      process.env.LOG_FILE_PATH || path.join(process.cwd(), 'logs');

    if (this.logToFile) {
      this.ensureLogDirectory();
    }
  }

  private ensureLogDirectory(): void {
    if (!fs.existsSync(this.logFilePath)) {
      fs.mkdirSync(this.logFilePath, { recursive: true });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const currentIndex = this.logLevels.indexOf(this.currentLogLevel);
    const targetIndex = this.logLevels.indexOf(level);
    return targetIndex <= currentIndex;
  }

  private formatLogEntry(
    level: string,
    message: any,
    context?: string,
    data?: Record<string, any>,
    trace?: string,
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      context,
      message: typeof message === 'string' ? message : JSON.stringify(message),
      data,
      trace,
    };
  }

  private writeLog(entry: LogEntry): void {
    const jsonLog = JSON.stringify(entry);

    // Write to stdout/stderr
    if (entry.level === 'ERROR') {
      process.stderr.write(jsonLog + '\n');
    } else {
      process.stdout.write(jsonLog + '\n');
    }

    // Write to file if enabled
    if (this.logToFile) {
      const date = new Date().toISOString().split('T')[0];
      const filename = `app-${date}.log`;
      const filepath = path.join(this.logFilePath, filename);
      fs.appendFileSync(filepath, jsonLog + '\n');
    }
  }

  log(message: any, context?: string): void {
    if (this.shouldLog('log')) {
      const entry = this.formatLogEntry('info', message, context);
      this.writeLog(entry);
    }
  }

  error(message: any, trace?: string, context?: string): void {
    if (this.shouldLog('error')) {
      const entry = this.formatLogEntry(
        'error',
        message,
        context,
        undefined,
        trace,
      );
      this.writeLog(entry);
    }
  }

  warn(message: any, context?: string): void {
    if (this.shouldLog('warn')) {
      const entry = this.formatLogEntry('warn', message, context);
      this.writeLog(entry);
    }
  }

  debug(message: any, context?: string): void {
    if (this.shouldLog('debug')) {
      const entry = this.formatLogEntry('debug', message, context);
      this.writeLog(entry);
    }
  }

  verbose(message: any, context?: string): void {
    if (this.shouldLog('verbose')) {
      const entry = this.formatLogEntry('verbose', message, context);
      this.writeLog(entry);
    }
  }

  // Extended method for structured logging with additional data
  logWithData(
    level: 'info' | 'warn' | 'error' | 'debug',
    message: string,
    data: Record<string, any>,
    context?: string,
  ): void {
    const levelMap: Record<string, LogLevel> = {
      info: 'log',
      warn: 'warn',
      error: 'error',
      debug: 'debug',
    };

    if (this.shouldLog(levelMap[level])) {
      const entry = this.formatLogEntry(level, message, context, data);
      this.writeLog(entry);
    }
  }

  // HTTP request logging
  logHttpRequest(data: {
    method: string;
    url: string;
    statusCode: number;
    duration: number;
    userAgent?: string;
    ip?: string;
    userId?: string;
    requestId?: string;
  }): void {
    const entry = this.formatLogEntry(
      'info',
      `${data.method} ${data.url} ${data.statusCode} ${data.duration}ms`,
      'HTTP',
      {
        method: data.method,
        url: data.url,
        statusCode: data.statusCode,
        duration: data.duration,
        userAgent: data.userAgent,
        ip: data.ip,
        userId: data.userId,
        requestId: data.requestId,
      },
    );
    this.writeLog(entry);
  }

  // Error tracking
  logError(
    error: Error,
    context?: string,
    additionalData?: Record<string, any>,
  ): void {
    const entry = this.formatLogEntry(
      'error',
      error.message,
      context,
      {
        name: error.name,
        ...additionalData,
      },
      error.stack,
    );
    this.writeLog(entry);
  }
}
