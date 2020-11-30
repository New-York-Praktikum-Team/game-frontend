import { Dispatch } from 'react';
import * as api from 'modules/api';
import { SignInRequest, SignUpRequest } from 'interfaces';
import { store } from 'store/store';
import { fetchUser } from 'store/user/thunks';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import {
  LoginAction, LoginErrorAction, fetchAuthSuccess, fetchLoginError,
} from './actions';

export const loginRequest = (values: SignInRequest) => (
  async (dispatch: Dispatch<LoginAction | LoginErrorAction>) => {
    try {
      await api.signIn(values.login, values.password);

      store.dispatch(fetchUser);
      dispatch(fetchAuthSuccess());
    } catch (responseError) {
      const error = await getErrorFromRequest(responseError);

      dispatch(fetchLoginError(error));
    }
  }
);

export const signUpRequest = (values: SignUpRequest) => (
  async (dispatch: Dispatch<LoginAction | LoginErrorAction>) => {
    try {
      await api.signUp(values);

      store.dispatch(fetchUser);
      dispatch(fetchAuthSuccess());
    } catch (responseError) {
      const error = await getErrorFromRequest(responseError);

      dispatch(fetchLoginError(error));
    }
  }
);
