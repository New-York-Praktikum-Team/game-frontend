import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';

export const loggedSelector = createSelector(
  ({ user: { isLoading, data } }: RootState) => ({ isLoading, data }),
  ({ isLoading, data }) => (!isLoading && (data !== null)),
);

export const userLoadingSelector = createSelector(
  (state: RootState) => state.user.isLoading,
  (isLoading) => isLoading,
);

export const userLoginSelector = createSelector(
  (state: RootState) => state.user.data?.login,
  (login) => login,
);

export const userSelector = createSelector(
  (state: RootState) => state.user.data,
  (userData) => userData,
);
