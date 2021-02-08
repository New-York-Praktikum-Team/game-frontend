import { NextFunction, Request, Response } from 'express';

export const isAuth = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  if (response.locals.user) {
    next();
  } else {
    response.status(401).json({ error: true, message: 'Authorization is required' });
  }
};
