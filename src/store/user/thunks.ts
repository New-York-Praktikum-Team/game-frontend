import * as api from 'modules/api';
import { Dispatch } from 'react';
import { BaseActionType } from 'store/types';
import { User } from 'interfaces';
import { store } from 'store/store';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import {
  ItemActionType,
  UserActions,
  fetchUserError,
  fetchUserSuccess, fetchUserUpdate, fetchUserUpdateError, fetchUserUpdateSuccess,
} from './actions';

export async function fetchUser(dispatch: Dispatch<ItemActionType | BaseActionType<UserActions>>) {
  try {
    const item = await api.getUserInfo();
    dispatch(fetchUserSuccess(item));
  } catch (err) {
    dispatch(fetchUserError());
  }
}

export const userUpdateRequest = (user: User) => (
  async (dispatch: Dispatch<ItemActionType | BaseActionType<UserActions>>) => {
    try {
      await api.changeUserProfile(user);
      await store.dispatch(fetchUserUpdate);
      dispatch(fetchUserUpdateSuccess());
    } catch (responseError) {
      const error = await getErrorFromRequest(responseError);
      dispatch(fetchUserUpdateError(error));
    }
  }
);
