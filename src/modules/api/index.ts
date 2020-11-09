import ky, { Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: 'https://ya-praktikum.tech/api/v2',
  json: true,
  throwHttpErrors: true,
};

export const HTTPTransport = ky.create(defaultOptions);
