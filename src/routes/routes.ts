import { RouteProps } from 'react-router-dom';
import { Profile } from 'pages/Profile';
import { SignUp } from 'pages/SignUp';
import { Home } from 'pages/Home';
import { SignIn } from 'pages/SignIn';
import { Game } from 'pages/Game';
import { Leaderboard } from 'pages/Leaderboard';
import { NotFound } from 'pages/NotFound';
import { AppUrls } from './appUrls';

export interface AppRoute extends RouteProps {
  isPrivate: boolean;
}

export const ROUTES: AppRoute[] = [
  {
    exact: true,
    path: AppUrls.Home,
    component: Home,
    isPrivate: false,
  },
  {
    exact: true,
    path: AppUrls.SignIn,
    component: SignIn,
    isPrivate: false,
  },
  {
    exact: true,
    path: AppUrls.SignUp,
    component: SignUp,
    isPrivate: false,
  },
  {
    exact: true,
    path: AppUrls.Profile,
    component: Profile,
    isPrivate: true,
  },
  {
    exact: true,
    path: AppUrls.Game,
    component: Game,
    isPrivate: true,
  },
  {
    exact: true,
    path: AppUrls.Leaderboard,
    component: Leaderboard,
    isPrivate: true,
  },
  {
    component: NotFound,
    isPrivate: false,
  },
];
