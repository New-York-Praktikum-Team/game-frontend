import ky, { Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: 'https://ya-praktikum.tech/api/v2',
  throwHttpErrors: true,
  credentials: 'include',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
  },
};

export const HTTPTransport = ky.create(defaultOptions);
