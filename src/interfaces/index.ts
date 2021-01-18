type RatingFieldName = 'nymaScore';

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

export interface UserUpdateRequestDTO {
  first_name: string;
  second_name: string;
  display_name: string
  login: string;
  email: string;
  phone: string;
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

export interface SignInRequest {
  login: string;
  password: string;
}

export interface SignUpResponse {
  id: number;
}

export interface ApiError {
  code: number | null;
  message: string;
}

export interface GetLeaderboardRequest {
  ratingFieldName: RatingFieldName;
  cursor: number;
  limit: number;
}

export interface GetLeaderboardResponseItem {
  data: Leader
}

export interface SetLeaderboardItemRequest {
  data: Leader
  ratingFieldName: RatingFieldName;
}

export interface Leader {
  name: string;
  nymaScore: number;
}

export interface OAuthGetYandexServiceResponseDTO {
  service_id: string;
}

export interface OAuthYandexService {
  serviceId: string;
}
