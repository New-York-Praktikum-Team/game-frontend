import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';

export const userLoadingSelector = createSelector(
  (state: RootState) => state.user.isLoading,
  (isLoading) => isLoading,
);

export const userSelector = createSelector(
  (state: RootState) => state.user.data,
  (userData) => userData,
);

export const userLoginSelector = createSelector(
  userSelector,
  (userData) => userData && userData.login,
);

export const loggedSelector = createSelector(
  userLoadingSelector,
  userSelector,
  (isLoading, data) => (!isLoading && (data !== null)),
);
