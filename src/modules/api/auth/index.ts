import { transformUser } from '../../transform';
import { HTTPTransport } from '../../HTTPTransport';
import {
  SignUpRequestDTO, SignUpResponse, User, UserDTO,
} from '../../../interfaces';

class AuthApi {
  public signIn = (login: string, password: string): Promise<string> => HTTPTransport.post('auth/signin', { json: { login, password } }).text();

  public signUp = (user: SignUpRequestDTO): Promise<SignUpResponse> => HTTPTransport.post('auth/signup', { json: user }).json<SignUpResponse>();

  public getUserInfo = async (): Promise<User> => {
    const response = await HTTPTransport.get('auth/user').json<UserDTO>();
    return transformUser(response);
  };
}

export const authApi = new AuthApi();
