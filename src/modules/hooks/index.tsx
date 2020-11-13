import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppRoute } from 'routes/routes';
import { AppUrls } from 'routes/appUrls';

export const usePrivateRoute = (
  routerProps: AppRoute,
  isLogged: boolean,
  key: number,
): ReactElement => {
  if (!isLogged && routerProps.isPrivate) return <Redirect key={key} to={AppUrls.SignIn}/>;
  return <Route {...routerProps} key={key}/>;
};
