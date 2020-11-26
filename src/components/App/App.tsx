import React, { FC } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { ROUTES } from 'routes/routes';
import { PrivateRoute } from 'components/PrivateRoute';
import { Navigation } from 'components/Navigation';
import { Store } from 'store';
import { useAuth } from 'hooks/useAuth';
import { OfflineMessage } from 'components/Offline';
import { useGeolocation } from 'hooks/userGeolocation';

export const App: FC = () => {
  const {
    isReady, user, setUser, isLogged, setLogged,
  } = useAuth();

  const { geolocation } = useGeolocation();

  if (!isReady) {
    return null;
  }

  return (
    <article className="app">
      <Store.Provider value={{
        user, setUser, isLogged, setLogged, geolocation,
      }}>
        <Router>
          <header>
            <Navigation />
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
      </Store.Provider>
    </article>
  );
};
