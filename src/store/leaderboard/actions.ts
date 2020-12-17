import { GetLeaderboardResponseItem } from 'interfaces';
import { BaseActionType } from '../types';

export enum LeaderboardActions {
  FETCH_LEADERBOARD_REQUEST = '@@leaderboard/FETCH_LEADERBOARD_REQUEST',
  FETCH_LEADERBOARD_SUCCESS = '@@leaderboard/FETCH_LEADERBOARD_SUCCESS',
  FETCH_LEADERBOARD_ERROR = '@@leaderboard/FETCH_LEADERBOARD_ERROR',
}

export interface ItemActionType extends BaseActionType<LeaderboardActions> {
  item: GetLeaderboardResponseItem[];
}

export function fetchLeaderboardSuccess(leaderboard: GetLeaderboardResponseItem[]): ItemActionType {
  return { type: LeaderboardActions.FETCH_LEADERBOARD_SUCCESS, item: leaderboard };
}
export function fetchLeaderboardError(): BaseActionType<LeaderboardActions> {
  return { type: LeaderboardActions.FETCH_LEADERBOARD_ERROR };
}
export function fetchLeaderboardRequest(): BaseActionType<LeaderboardActions> {
  return { type: LeaderboardActions.FETCH_LEADERBOARD_REQUEST };
}
