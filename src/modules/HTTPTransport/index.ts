import ky, { Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: 'https://ya-praktikum.tech/api/v2',
};

export const HTTPTransport = ky.create(defaultOptions);
