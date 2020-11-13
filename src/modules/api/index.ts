import { transformSignUp, transformUser } from 'modules/transform';
import { HTTPTransport } from 'modules/HTTPTransport';

import {
  SignUpRequest, SignUpRequestDTO, SignUpResponse, User, UserDTO,
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

export const logout = (): Promise<string> => HTTPTransport.post('auth/logout').text();
