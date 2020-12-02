import { ApiError, User } from 'interfaces';
import { BaseActionType } from '../types';

export enum UserActions {
  FETCH_USER_REQUEST = '@@user/FETCH_USER_REQUEST',
  FETCH_USER_SUCCESS = '@@user/FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = '@@user/FETCH_USER_ERROR',
  FETCH_USER_UPDATE = '@@user/FETCH_USER_UPDATE',
  FETCH_USER_UPDATE_SUCCESS = '@@user/FETCH_USER_UPDATE_SUCCESS',
  FETCH_USER_UPDATE_ERROR = '@@user/FETCH_USER_UPDATE_ERROR',
}

export interface ItemActionType extends BaseActionType<UserActions> {
  item: User | null;
}

export interface UserUpdateErrorAction extends BaseActionType<UserActions> {
  error: ApiError;
}

export function fetchUserSuccess(user: User): ItemActionType {
  return { type: UserActions.FETCH_USER_SUCCESS, item: user };
}
export function fetchUserError(): BaseActionType<UserActions> {
  return { type: UserActions.FETCH_USER_ERROR };
}
export function fetchUserRequest(): BaseActionType<UserActions> {
  return { type: UserActions.FETCH_USER_REQUEST };
}
export function fetchUserUpdate(): BaseActionType<UserActions> {
  return { type: UserActions.FETCH_USER_UPDATE };
}
export function fetchUserUpdateSuccess(): BaseActionType<UserActions> {
  return { type: UserActions.FETCH_USER_UPDATE_SUCCESS };
}
export function fetchUserUpdateError(error: ApiError): UserUpdateErrorAction {
  return { type: UserActions.FETCH_USER_UPDATE_ERROR, error };
}
