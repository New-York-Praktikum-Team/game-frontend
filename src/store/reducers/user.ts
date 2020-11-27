import { User } from 'interfaces';
import { ItemActionType, UserActions } from 'store/actions/user';

type LoadStatus = 'success' | 'pending' | 'failed';

type UserReducer = {
  item: User | null;
  status: LoadStatus;
};

const defaultReducer: UserReducer = {
  status: 'pending',
  item: null,
};

export function userReducer(
  state: UserReducer = defaultReducer,
  { type, item }: ItemActionType,
): UserReducer {
  switch (type) {
    case UserActions.PENDING:
      return {
        ...state,
        status: 'pending',
      };
    case UserActions.SUCCESS:
      return {
        ...state,
        status: 'success',
      };
    case UserActions.FAILED:
      return {
        ...state,
        status: 'failed',
      };
    case UserActions.SET_USER_ITEM:
      return item
        ? {
          ...state,
          item,
        }
        : state;
    default:
      return state;
  }
}
