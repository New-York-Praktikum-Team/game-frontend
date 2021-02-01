import ky, { Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include',
};

export const HTTPTransport = ky.create(defaultOptions);

const localApiOptions: Options = {
  prefixUrl: 'https://local.ya-praktikum.tech:5001/api/',
  credentials: 'include',
  mode: 'cors',
};

export const HTTPLocalTransport = ky.create(localApiOptions);
