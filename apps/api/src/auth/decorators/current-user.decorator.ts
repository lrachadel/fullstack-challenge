import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface RequestUser {
  id: string;
  username: string;
  role: string;
}

interface RequestWithUser {
  user?: RequestUser;
}

/**
 * Decorator to extract the current authenticated user from the request
 */
export const CurrentUser = createParamDecorator(
  (
    data: keyof RequestUser | undefined,
    ctx: ExecutionContext,
  ): RequestUser | string | undefined => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (data && user) {
      return user[data];
    }

    return user;
  },
);
