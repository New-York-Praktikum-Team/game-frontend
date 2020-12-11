import { Dispatch } from 'react';
import { ItemActionType } from 'store/user/actions';
import { BaseActionType } from 'store/types';
import * as api from 'modules/api';
import { LeaderboardActions, fetchLeaderboardAction } from 'store/leaderboard/actions';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import { notification } from 'components/Notification';

export async function fetchLeaderboard(
  dispatch: Dispatch<ItemActionType | BaseActionType<LeaderboardActions>>,
) {
  try {
    const leaderboard = await api.getLeaderboard({ ratingFieldName: 'numaScore', cursor: 0, limit: 1000 });
    dispatch(fetchLeaderboardAction(leaderboard));
  } catch (responseError) {
    const error = await getErrorFromRequest(responseError);
    notification.error(error.message);
  }
}
