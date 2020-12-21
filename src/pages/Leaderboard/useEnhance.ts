import { useSelector } from 'react-redux';
import { leaderboardSelector } from 'store/leaderboard/selectors';
import { GetLeaderboardResponseItem } from 'interfaces';

export const useEnhance = () => {
  const leaderboard: GetLeaderboardResponseItem[] = useSelector(leaderboardSelector);

  return { leaderboard };
};
