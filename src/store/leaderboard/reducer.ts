import { GetLeaderboardResponseItem } from 'interfaces';
import { BaseActionType } from 'store/types';
import { ItemActionType, LeaderboardActions } from 'store/leaderboard/actions';

type LeaderboardReducer = {
  data: GetLeaderboardResponseItem[];
  isLoading: boolean
};

const defaultReducer: LeaderboardReducer = {
  data: [],
  isLoading: true,
};

export function leaderboardReducer(
  state: LeaderboardReducer = defaultReducer,
  action: BaseActionType<LeaderboardActions> & ItemActionType,
): LeaderboardReducer {
  switch (action.type) {
    case LeaderboardActions.FETCH_LEADERBOARD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LeaderboardActions.FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        data: action.item,
        isLoading: false,
      };
    case LeaderboardActions.FETCH_LEADERBOARD_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
