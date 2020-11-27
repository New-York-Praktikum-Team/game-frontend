import { User } from 'interfaces';
import * as api from 'modules/api';
import { Dispatch } from 'react';
import { BaseActionType } from './common';

export enum UserActions {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SET_USER_ITEM = 'SET_USER_ITEM',
}

export interface ItemActionType extends BaseActionType<UserActions> {
  item?: User | null;
}

export function loadSuccess(): BaseActionType<UserActions> {
  return { type: UserActions.SUCCESS };
}
export function loadFailed(): BaseActionType<UserActions> {
  return { type: UserActions.FAILED };
}
export function loadPending(): BaseActionType<UserActions> {
  return { type: UserActions.PENDING };
}

export function setUser(user: User): ItemActionType {
  return { type: UserActions.SET_USER_ITEM, item: user };
}

export async function fetchUser(dispatch: Dispatch<ItemActionType>) {
  try {
    const item = await api.getUserInfo();
    dispatch(setUser(item));
    dispatch(loadSuccess());
  } catch (err) {
    dispatch(loadFailed());
  }
}
