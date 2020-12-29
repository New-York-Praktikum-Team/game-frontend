import * as api from 'modules/api';
import { Dispatch } from 'react';
import { BaseActionType } from 'store/types';
import { User } from 'interfaces';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import { notification } from 'components/Notification';
import { store } from 'store/store';
import {
  ItemActionType,
  UserActions,
  fetchUserError,
  fetchUserRequest,
  fetchUserSuccess,
  userLogoutRequest,
  userUpdateSuccess,
} from './actions';

export async function fetchUser(dispatch: Dispatch<ItemActionType | BaseActionType<UserActions>>) {
  try {
    dispatch(fetchUserRequest());
    const item = await api.getUserInfo();
    dispatch(fetchUserSuccess(item));
  } catch (err) {
    dispatch(fetchUserError());
  }
}

export const updateUserProfile = (user: User) => (
  async () => {
    try {
      await api.changeUserProfile(user);
      notification.success('Profile updated successfully');
      const item = await api.getUserInfo();
      store.dispatch(userUpdateSuccess(item));
    } catch (responseError) {
      const error = await getErrorFromRequest(responseError);
      notification.error(error.message);
    }
  }
);

export const changeUserAvatar = (file: File) => (
  async () => {
    try {
      await api.changeUserAvatar(file);
      notification.success('Avatar updated successfully');
      await store.dispatch(fetchUser);
    } catch (responseError) {
      notification.error(await responseError.response.text());
    }
  }
);

export const changeUserPassword = (oldPassword: string, newPassword: string) => (
  async () => {
    try {
      await api.changeUserPassword(oldPassword, newPassword);
      notification.success('Password updated successfully');
    } catch (responseError) {
      notification.error(await responseError.response.text());
    }
  }
);

export async function userLogout(dispatch: Dispatch<ItemActionType | BaseActionType<UserActions>>) {
  try {
    await api.logout();
    dispatch(userLogoutRequest());
  } catch (responseError) {
    const error = await getErrorFromRequest(responseError);
    notification.error(error.message);
  }
}
