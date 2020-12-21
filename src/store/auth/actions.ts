import { ApiError } from 'interfaces';
import { BaseActionType } from '../types';

export enum AuthActions {
  FETCH_AUTH_REQUEST = '@@auth/FETCH_AUTH_REQUEST',
  FETCH_AUTH_SUCCESS = '@@auth/FETCH_AUTH_SUCCESS',
  FETCH_AUTH_ERROR = '@@auth/FETCH_AUTH_ERROR',
}

export interface LoginErrorAction extends BaseActionType<AuthActions> {
  error: ApiError;
}

export type LoginAction = BaseActionType<AuthActions>;

export function fetchAuthSuccess(): LoginAction {
  return { type: AuthActions.FETCH_AUTH_SUCCESS };
}
export function fetchLoginError(error: ApiError): LoginErrorAction {
  return { type: AuthActions.FETCH_AUTH_ERROR, error };
}
export function fetchLoginRequest(): LoginAction {
  return { type: AuthActions.FETCH_AUTH_REQUEST };
}
