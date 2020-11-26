export interface Country {
  languages: string;
  distance: string,
  countryCode: string,
  countryName: string
}

export interface UserGeolocation extends Position {
  country: Country
}

export interface User {
  id: number;
  firstName: string;
  secondName: string;
  displayName: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface UserDTO {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
}

export interface SignUpRequestDTO {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  login: string;
  firstName: string;
  secondName: string;
  phone: string;
  password: string;
  verifyPassword: string;
}

export interface SignUpResponse {
  id: number;
}
