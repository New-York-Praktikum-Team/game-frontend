import { Dispatch } from 'react';
import { ItemActionType } from 'store/user/actions';
import { BaseActionType } from 'store/types';
import * as api from 'modules/api';
import {
  LeaderboardActions,
  fetchLeaderboardError,
  fetchLeaderboardRequest,
  fetchLeaderboardSuccess,
  setLeaderboardError,
  setLeaderboardRequest,
  setLeaderboardSuccess,
} from 'store/leaderboard/actions';
import { getErrorFromRequest } from 'modules/getErrorFromRequest';
import { notification } from 'components/Notification';
import { store } from 'store/store';
import { getUserName } from 'modules/getUserName';

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

export async function setLeaderboard(score: number) {
  try {
    store.dispatch(setLeaderboardRequest);

    const user = store.getState().user.data;

    if (user) {
      await api.setLeaderboardItem({
        ratingFieldName: 'nymaScore',
        data: {
          name: getUserName(user),
          nymaScore: score,
        },
      });
    }

    store.dispatch(setLeaderboardSuccess);
  } catch (responseError) {
    store.dispatch(setLeaderboardError);
    const error = await getErrorFromRequest(responseError);
    notification.error(error.message);
  }
}
