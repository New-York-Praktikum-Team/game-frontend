import ky, { Options } from 'ky';

const defaultOptions: Options = {
  prefixUrl: 'https://ya-praktikum.tech/api/v2',
  credentials: 'include',
};

export const HTTPTransport = ky.create(defaultOptions);

const localApiOptions: Options = {
  prefixUrl: `http://${window.location.hostname}:5001/api/`,
};

export const HTTPLocalTransport = ky.create(localApiOptions);
