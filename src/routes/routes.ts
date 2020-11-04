import { RouteProps } from 'react-router-dom';
import { Profile } from '../pages/Profile';
import { SignUp } from '../pages/SignUp';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { Game } from '../pages/Game';
import { Leaderboard } from '../pages/Leaderboard';
import { NotFound } from '../pages/NotFound';
import { AppUrls } from './appUrls';

export const ROUTES: RouteProps[] = [
  {
    exact: true,
    path: AppUrls.Home,
    component: Home,
  },
  {
    exact: true,
    path: AppUrls.SignIn,
    component: SignIn,
  },
  {
    exact: true,
    path: AppUrls.SignUp,
    component: SignUp,
  },
  {
    exact: true,
    path: AppUrls.Profile,
    component: Profile,
  },
  {
    exact: true,
    path: AppUrls.Game,
    component: Game,
  },
  {
    exact: true,
    path: AppUrls.Leaderboard,
    component: Leaderboard,
  },
  {
    component: NotFound,
  },
];
