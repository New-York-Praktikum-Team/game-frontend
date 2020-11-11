import {
  SignUpRequest, SignUpRequestDTO, User, UserDTO,
} from '../../interfaces';

export const transformUser = (user: UserDTO): User => ({
  id: user.id,
  email: user.email,
  avatar: user.avatar,
  firstName: user.first_name,
  secondName: user.second_name,
  displayName: user.display_name,
  login: user.login,
  phone: user.phone,
});

export const transformSignUp = (user: SignUpRequest): SignUpRequestDTO => ({
  email: user.email,
  login: user.login,
  password: user.password,
  first_name: user.firstName,
  second_name: user.secondName,
  phone: user.phone,
});
