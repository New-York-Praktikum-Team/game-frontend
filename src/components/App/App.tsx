import React, { useEffect, useState } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { PrivateRoute } from 'components/PrivateRoute';
import { Navigation } from 'components/Navigation';
import { OfflineMessage } from 'components/Offline';
import { ROUTES } from 'routes/routes';
import { store } from 'store/store';
import { fetchUser } from 'store/user/thunks';
import { loggedSelector } from 'store/user/selectors';
import { notification } from 'components/Notification';
import { hot } from 'react-hot-loader/root';
import { getUserTheme } from 'store/themes/thunks';
import { getThemeFromCache, setThemeStyles } from 'modules/setTheme';
import * as api from '../../modules/api';

export const App = hot(withRouter(({ history }) => {
  const isUserLogged = useSelector(loggedSelector);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const themeFromCache = getThemeFromCache();

    if (themeFromCache) {
      setThemeStyles(themeFromCache);
      setReady(true);
    }

    if (isUserLogged) {
      if (!themeFromCache) {
        store.dispatch(getUserTheme()).then(() => {
          const { theme } = store.getState().themes;
          if (theme) {
            setThemeStyles(theme);
          }
          setReady(true);
        });
      }
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        urlParams.delete('code');
        history.replace({ search: urlParams.toString() });

        api.OAuthYandexSignInRequest(code).then(() => {
          notification.success('Authorisation Success with Yandex');
          store.dispatch(fetchUser);
        }).catch(() => {
          notification.error('Authorisation Error with Yandex');
        });
      } else {
        store.dispatch(fetchUser);
      }

      setReady(true);
    }
  }, []);

  return (
    <article className="app" style={{ opacity: Number(ready) }}>
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
}));
