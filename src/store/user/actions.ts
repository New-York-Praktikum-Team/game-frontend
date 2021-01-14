import { User } from 'interfaces';
import { BaseActionType } from '../types';

export enum UserActions {
  FETCH_USER_REQUEST = '@@user/FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = '@@user/FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = '@@user/FETCH_USER_ERROR',
  USER_UPDATE_SUCCESS = '@@user/USER_UPDATE_SUCCESS',
  USER_LOGOUT = '@@user/USER_LOGOUT',
}

export interface ItemActionType extends BaseActionType<UserActions> {
  item: User | null;
}
export function fetchUserSuccess(user: User): ItemActionType {
  return { type: UserActions.FETCH_USER_SUCCESS, item: user };
}
export function userUpdateSuccess(user: User): ItemActionType {
  return { type: UserActions.USER_UPDATE_SUCCESS, item: user };
}
export function fetchUserError(): BaseActionType<UserActions> {
  return { type: UserActions.FETCH_USER_ERROR };
}
export function fetchUserRequest(): BaseActionType<UserActions> {
  return { type: UserActions.FETCH_USER_REQUEST };
}
export function userLogoutRequest(): BaseActionType<UserActions> {
  return { type: UserActions.USER_LOGOUT };
}
