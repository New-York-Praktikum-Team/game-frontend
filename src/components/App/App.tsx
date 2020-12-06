import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { PrivateRoute } from 'components/PrivateRoute';
import { Navigation } from 'components/Navigation';
import { OfflineMessage } from 'components/Offline';
import { ROUTES } from 'routes/routes';
import { store } from 'store/store';
import { fetchUser } from 'store/user/thunks';
import { isLoading, isLogged } from 'store/user/selectors';

export const App: FC = () => {
  const isUserLogged = useSelector(isLogged);
  const isUserLoading = useSelector(isLoading);

  useEffect(() => {
    store.dispatch(fetchUser);
  }, []);

  if (isUserLoading) {
    // TODO?: add loader
    return null;
  }

  return (
    <article className="app">
      <Router>
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
      </Router>
    </article>
  );
};
