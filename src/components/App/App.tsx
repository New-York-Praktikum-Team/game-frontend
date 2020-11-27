import React, { FC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { ROUTES } from 'routes/routes';
import { PrivateRoute } from 'components/PrivateRoute';
import { Navigation } from 'components/Navigation';
import { OfflineMessage } from 'components/Offline';
import { useSelector } from 'react-redux';
import { RootState } from 'store/reducers';

export const App: FC = () => {
  const [isLogged, isLoading] = useSelector((state: RootState) => {
    const { status } = state.user;

    return [
      status === 'success',
      status === 'pending',
    ];
  });

  if (isLoading) {
    // TODO?: add loader
    return null;
  }

  return (
    <article className="app">
        <Router>
          <header>
            <Navigation isLogged={isLogged}/>
            <OfflineMessage />
          </header>
          <main>
            <ErrorBoundary>
              <Switch>
                {ROUTES.map((appRoute) => PrivateRoute(appRoute, isLogged))}
              </Switch>
            </ErrorBoundary>
          </main>
        </Router>
    </article>
  );
};
