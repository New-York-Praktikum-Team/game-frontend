import { ApiError } from 'interfaces';
import { RootState } from 'store/rootReducer';

export const authError = (state: RootState): ApiError | undefined => state.auth.error;

export const isAuthentificated = (state: RootState): boolean => {
  const { isLoading, error } = state.auth;

  return !isLoading && !error;
};
