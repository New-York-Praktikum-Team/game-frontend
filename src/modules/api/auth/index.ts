import { HTTPTransport } from '../index';

interface IUser {
  readonly id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
  password: string;
}

interface ISignUpRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

interface ISignUpResponse {
  id: number
}

class AuthApi {
  public signin = (login: string, password: string): Promise<string> => HTTPTransport.post('auth/signin', { json: { login, password } }).text();

  public signup = (user: ISignUpRequest): Promise<ISignUpResponse> => HTTPTransport.post('auth/signup', { json: user }).json<ISignUpResponse>();

  public getUserInfo = (): Promise<IUser> => HTTPTransport.get('auth/user').json<IUser>();
}

export const authApi = new AuthApi();
