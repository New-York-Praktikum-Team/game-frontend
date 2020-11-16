import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppRoute } from 'routes/routes';
import { AppUrls } from 'routes/appUrls';

export const privateRoute = (
  appRoute: AppRoute,
  isLogged: boolean,
): ReactElement => {
  const { isPrivate, path } = appRoute;

  if (isPrivate && !isLogged) {
    return <Redirect from={path} to={AppUrls.SignIn} key={path}/>;
  }

  return <Route {...appRoute} key={path} />;
};
