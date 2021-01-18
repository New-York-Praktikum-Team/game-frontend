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
import { hot } from 'react-hot-loader/root';

export const App: FC = hot(() => {
  const isUserLogged = useSelector(loggedSelector);

  useEffect((): void => {
    if (isUserLogged) return; // If user logged from SSR
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
});
