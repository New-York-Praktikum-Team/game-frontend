import React, { FC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { ROUTES } from 'routes/routes';
import { privateRoute } from 'components/PrivateRoute';
import { Navigation } from 'components/Navigation';
import { Store } from 'store';
import { useAuth } from 'hooks/useAuth';

export const App: FC = () => {
  const {
    isReady, user, setUser, isLogged, setLogged,
  } = useAuth();

  if (!isReady) {
    return null;
  }

  return (
    <article className="app">
      <Store.Provider value={{
        user, setUser, isLogged, setLogged,
      }}>
        <Router>
          <header>
            <Navigation />
          </header>
          <main>
            <ErrorBoundary>
              <Switch>
                {ROUTES.map((appRoute) => privateRoute(appRoute, isLogged))}
              </Switch>
            </ErrorBoundary>
          </main>
        </Router>
      </Store.Provider>
    </article>
  );
};
