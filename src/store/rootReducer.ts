import { combineReducers } from 'redux';
import { leaderboardReducer } from 'store/leaderboard/reducer';
import { authReducer } from 'store/auth/reducer';
import { userReducer } from 'store/user/reducer';
import { themesReducer } from 'store/themes/reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  leaderboard: leaderboardReducer,
  themes: themesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
