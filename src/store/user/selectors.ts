import { RootState } from 'store/rootReducer';

export const isLogged = (state: RootState): boolean => {
  const { isLoading, data } = state.user;

  return !isLoading && (data !== null);
};

export const isLoading = (state: RootState): boolean => state.user.isLoading;
