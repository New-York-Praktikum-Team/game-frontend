import { RootState } from 'store/rootReducer';
import { User } from 'interfaces';

export const isLogged = (state: RootState): boolean => {
  const { isLoading, data } = state.user;

  return !isLoading && (data !== null);
};

export const isLoading = (state: RootState): boolean => state.user.isLoading;

export const userLogin = (state: RootState): string | undefined => state.user.data?.login;

export const user = (state: RootState): User | null => state.user.data;
