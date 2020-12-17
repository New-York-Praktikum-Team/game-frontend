import { GetLeaderboardResponseItem } from 'interfaces';
import { BaseActionType } from '../types';

export enum LeaderboardActions {
  FETCH_LEADERBOARD_REQUEST = '@@leaderboard/FETCH_LEADERBOARD_REQUEST',
  FETCH_LEADERBOARD_SUCCESS = '@@leaderboard/FETCH_LEADERBOARD_SUCCESS',
  FETCH_LEADERBOARD_ERROR = '@@leaderboard/FETCH_LEADERBOARD_ERROR',

  SET_LEADERBOARD_REQUEST = '@@leaderboard/SET_LEADERBOARD_REQUEST',
  SET_LEADERBOARD_SUCCESS = '@@leaderboard/SET_LEADERBOARD_SUCCESS',
  SET_LEADERBOARD_ERROR = '@@leaderboard/SET_LEADERBOARD_ERROR',
}

export interface ItemActionType extends BaseActionType<LeaderboardActions> {
  item: GetLeaderboardResponseItem[];
}

export function fetchLeaderboardRequest(): BaseActionType<LeaderboardActions> {
  return { type: LeaderboardActions.FETCH_LEADERBOARD_REQUEST };
}
export function fetchLeaderboardSuccess(leaderboard: GetLeaderboardResponseItem[]): ItemActionType {
  return { type: LeaderboardActions.FETCH_LEADERBOARD_SUCCESS, item: leaderboard };
}
export function fetchLeaderboardError(): BaseActionType<LeaderboardActions> {
  return { type: LeaderboardActions.FETCH_LEADERBOARD_ERROR };
}

export function setLeaderboardRequest(): BaseActionType<LeaderboardActions> {
  return { type: LeaderboardActions.SET_LEADERBOARD_REQUEST };
}
export function setLeaderboardSuccess(): BaseActionType<LeaderboardActions> {
  return { type: LeaderboardActions.SET_LEADERBOARD_SUCCESS };
}
export function setLeaderboardError(): BaseActionType<LeaderboardActions> {
  return { type: LeaderboardActions.SET_LEADERBOARD_ERROR };
}
