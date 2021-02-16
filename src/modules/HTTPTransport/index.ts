import ky, { Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include',
};

export const HTTPTransport = ky.create(defaultOptions);

const isDevelopment = process.env.NODE_ENV === 'development';

const localApiOptions: Options = {
  prefixUrl: isDevelopment ? 'https://local.ya-praktikum.tech:5001/api/' : 'https://new-york-nyma-01.ya-praktikum.tech/api/',
  credentials: 'include',
  mode: 'cors',
};

export const HTTPLocalTransport = ky.create(localApiOptions);
