import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';

export const leaderboardSelector = createSelector(
  (state: RootState) => state.leaderboard.data,
  (leaderboardData) => leaderboardData,
);
