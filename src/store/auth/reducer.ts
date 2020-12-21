import { ApiError } from 'interfaces';
import { AuthActions, LoginAction, LoginErrorAction } from './actions';

type AuthReducer = {
  isLoading: boolean;
  error?: ApiError;
};

const defaultReducer: AuthReducer = {
  isLoading: true,
};

export function authReducer(
  state: AuthReducer = defaultReducer,
  action: LoginAction| LoginErrorAction,
): AuthReducer {
  switch (action.type) {
    case AuthActions.FETCH_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AuthActions.FETCH_AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
      };
    case AuthActions.FETCH_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: (action as LoginErrorAction).error,
      };
    default:
      return state;
  }
}
