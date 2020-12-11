import { GetLeaderboardResponseItem } from 'interfaces';
import { BaseActionType } from '../types';

export enum LeaderboardActions {
  FETCH_LEADERBOARD = '@@leaderboard/FETCH_LEADERBOARD',
}

export interface ItemActionType extends BaseActionType<LeaderboardActions> {
  item: GetLeaderboardResponseItem[];
}

export function fetchLeaderboardAction(leaderboard: GetLeaderboardResponseItem[]): ItemActionType {
  return { type: LeaderboardActions.FETCH_LEADERBOARD, item: leaderboard };
}
