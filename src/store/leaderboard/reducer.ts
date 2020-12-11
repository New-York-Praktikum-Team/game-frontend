import { GetLeaderboardResponseItem } from 'interfaces';
import { BaseActionType } from 'store/types';
import { ItemActionType, LeaderboardActions } from 'store/leaderboard/actions';

type LeaderboardReducer = {
  data: GetLeaderboardResponseItem[];
};

const defaultReducer: LeaderboardReducer = {
  data: [],
};

export function leaderboardReducer(
  state: LeaderboardReducer = defaultReducer,
  action: BaseActionType<LeaderboardActions> & ItemActionType,
): LeaderboardReducer {
  switch (action.type) {
    case LeaderboardActions.FETCH_LEADERBOARD:
      return {
        ...state,
        data: action.item,
      };
    default:
      return state;
  }
}
