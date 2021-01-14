import { NextFunction, Request, Response } from 'express';

export const serverUserAuthMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  // eslint-disable-next-line no-console
  console.log(request.cookies);
  // eslint-disable-next-line no-console
  console.log(request.signedCookies);
  next();
};
