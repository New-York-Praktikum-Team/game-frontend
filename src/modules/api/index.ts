import {
  transformSignUp, transformUser, transformUserUpdate, transformYandexService,
} from 'modules/transform';
import { HTTPTransport } from 'modules/HTTPTransport';

import {
  GetLeaderboardRequest,
  GetLeaderboardResponseItem,
  OAuthGetYandexServiceResponseDTO,
  OAuthYandexService,
  SetLeaderboardItemRequest,
  SignUpRequest,
  SignUpRequestDTO,
  SignUpResponse,
  User,
  UserDTO,
} from 'interfaces';

export const signIn = (login: string, password: string): Promise<string> => HTTPTransport.post('auth/signin', { json: { login, password } }).text();

export const signUp = (user: SignUpRequest): Promise<SignUpResponse> => {
  const payload: SignUpRequestDTO = transformSignUp(user);
  return HTTPTransport.post('auth/signup', { json: payload }).json<SignUpResponse>();
};

export const getUserInfo = async (): Promise<User> => {
  const response = await HTTPTransport.get('auth/user').json<UserDTO>();
  return transformUser(response);
};

export const changeUserProfile = async (user: User): Promise<User> => {
  const response = await HTTPTransport.put('user/profile', { json: transformUserUpdate(user) }).json<UserDTO>();
  return transformUser(response);
};

export const changeUserAvatar = async (file: File): Promise<User> => {
  const form = new FormData();
  form.append('avatar', file);
  return HTTPTransport.put('user/profile/avatar', { body: form }).json<User>();
};

export const changeUserPassword = async (
  oldPassword: string,
  newPassword: string,
): Promise<string> => HTTPTransport.put('user/password', {
  json: {
    oldPassword,
    newPassword,
  },
}).text();

export const logout = (): Promise<string> => HTTPTransport.post('auth/logout').text();

export const getLeaderboard = async (
  payload: GetLeaderboardRequest,
): Promise<GetLeaderboardResponseItem[]> => HTTPTransport.post('leaderboard/all', { json: payload }).json<GetLeaderboardResponseItem[]>();

export const setLeaderboardItem = async (
  payload: SetLeaderboardItemRequest,
): Promise<string> => HTTPTransport.post('leaderboard', { json: payload }).text();

export const getYandexOAuthService = async (): Promise<OAuthYandexService> => {
  const response = await HTTPTransport.get('oauth/yandex/service-id').json<OAuthGetYandexServiceResponseDTO>();
  return transformYandexService(response);
};

export const OauthYandexSignInRequest = async (
  code: string,
): Promise<string> => HTTPTransport.post('oauth/yandex', { json: { code } }).text();
