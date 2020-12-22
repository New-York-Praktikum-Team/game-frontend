import React, { FC, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { PrivateRoute } from 'components/PrivateRoute';
import { Navigation } from 'components/Navigation';
import { OfflineMessage } from 'components/Offline';
import { ROUTES } from 'routes/routes';
import { store } from 'store/store';
import { fetchUser } from 'store/user/thunks';
import { loggedSelector } from 'store/user/selectors';

export const App: FC = () => {
  const isUserLogged = useSelector(loggedSelector);

  useEffect(() => {
    store.dispatch(fetchUser);
  }, []);

  return (
    <article className="app">
      <header>
        <Navigation isLogged={isUserLogged}/>
        <OfflineMessage />
      </header>
      <main>
        <ErrorBoundary>
          <Switch>
            {ROUTES.map((appRoute) => PrivateRoute(appRoute, isUserLogged))}
          </Switch>
        </ErrorBoundary>
      </main>
    </article>
  );
};
