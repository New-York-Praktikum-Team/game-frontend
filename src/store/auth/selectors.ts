import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';

export const authErrorSelector = createSelector(
  (state: RootState) => state.auth.error,
  (authError) => authError,
);

export const authentificationSelector = createSelector(
  ({ auth: { isLoading, error } }: RootState) => ({ isLoading, error }),
  ({ isLoading, error }) => (!isLoading && !error),
);
