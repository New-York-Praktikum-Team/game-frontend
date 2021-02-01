import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export const authorization = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  const requestCookies = {
    uuid: request.cookies.uuid,
    authCookie: request.cookies.authCookie,
  };

  response.locals.user = null;

  if (requestCookies.authCookie) {
    const cookies = Object.entries(requestCookies).map(([key, value]) => `${key}=${value}`).join(';');

    try {
      const { data } = await axios.get('https://ya-praktikum.tech/api/v2/auth/user', {
        headers: { Cookie: cookies },
      });

      response.locals.user = data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  next();
};
