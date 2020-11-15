import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { ROUTES } from 'routes/routes';
import { User } from 'interfaces';
import * as api from 'modules/api';
import { Navigation } from 'components/Navigation';
import { Store } from 'store';
import { usePrivateRoute } from 'modules/hooks';

export const App: FC = () => {
  const [isReady, setReady] = useState<boolean>(false);
  const [isLogged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.getUserInfo().then((result) => {
      setUser(result);
      setLogged(true);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    }).finally(() => {
      setReady(true);
    });
  }, []);

  if (isReady) {
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
                  {ROUTES.map((routeProps, index) => (
                    usePrivateRoute(routeProps, isLogged, index)
                  ))}
                </Switch>
              </ErrorBoundary>
            </main>
          </Router>
        </Store.Provider>
      </article>
    );
  }

  return null;
};
