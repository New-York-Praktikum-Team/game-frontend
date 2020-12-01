import * as api from 'modules/api';
import { Dispatch } from 'react';
import { BaseActionType } from 'store/types';
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
