import { Dispatch } from 'react';
import { ItemActionType } from 'store/user/actions';
import { BaseActionType } from 'store/types';
import * as api from 'modules/api';
import {
  LeaderboardActions, fetchLeaderboardError, fetchLeaderboardRequest, fetchLeaderboardSuccess,
} from 'store/leaderboard/actions';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import { notification } from 'components/Notification';

export async function fetchLeaderboard(
  dispatch: Dispatch<ItemActionType | BaseActionType<LeaderboardActions>>,
) {
  try {
    dispatch(fetchLeaderboardRequest());
    const leaderboard = await api.getLeaderboard({ ratingFieldName: 'nymaScore', cursor: 0, limit: 1000 });
    dispatch(fetchLeaderboardSuccess(leaderboard));
  } catch (responseError) {
    dispatch(fetchLeaderboardError());
    const error = await getErrorFromRequest(responseError);
    notification.error(error.message);
  }
}
