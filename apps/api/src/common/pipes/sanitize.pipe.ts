import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { sanitizeObject, sanitizeString } from '../utils/sanitize.util';

/**
 * Global pipe that sanitizes all incoming string data to prevent XSS attacks
 */
@Injectable()
export class SanitizePipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    if (metadata.type !== 'body' && metadata.type !== 'query') {
      return value;
    }

    if (typeof value === 'string') {
      return sanitizeString(value);
    }

    if (typeof value === 'object' && value !== null) {
      return sanitizeObject(value as Record<string, unknown>);
    }

    return value;
  }
}
