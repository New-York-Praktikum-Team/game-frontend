import * as api from 'modules/api';
import { Dispatch } from 'react';
import { BaseActionType } from 'store/types';
import { User } from 'interfaces';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';

import { notification } from 'components/Notification';
import {
  ItemActionType,
  UserActions,
  fetchUserError,
  fetchUserSuccess,
} from './actions';

export async function fetchUser(dispatch: Dispatch<ItemActionType | BaseActionType<UserActions>>) {
  try {
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
    } catch (responseError) {
      const error = await getErrorFromRequest(responseError);
      notification.error(error.message);
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
