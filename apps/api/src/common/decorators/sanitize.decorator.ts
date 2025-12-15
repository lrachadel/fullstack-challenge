import { Transform } from 'class-transformer';
import { sanitizeString } from '../utils/sanitize.util';

/**
 * Decorator to sanitize string properties in DTOs
 * Use this on string fields that accept user input
 */
export function Sanitize(): PropertyDecorator {
  return Transform(({ value }: { value: unknown }): unknown => {
    if (typeof value === 'string') {
      return sanitizeString(value);
    }
    return value;
  });
}
