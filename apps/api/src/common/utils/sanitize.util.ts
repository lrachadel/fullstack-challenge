import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes a string to prevent XSS attacks
 * Removes all HTML tags and dangerous content
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') {
    return input;
  }

  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
  }).trim();
}

/**
 * Sanitizes an object's string properties recursively
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const sanitized: Record<string, unknown> = { ...obj };

  for (const key of Object.keys(sanitized)) {
    const value = sanitized[key];

    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }

  return sanitized as T;
}
