import React, { FC } from 'react';
import {
  Link, Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { AppUrls } from 'routes/appUrls';
import { ROUTES } from 'routes/routes';

export const App: FC = () => (
  <article className="app">
    <Router>
      <header>
        <nav>
          <ul>
            {
              Object.entries(AppUrls).map(([sectionName, sectionUrl]) => (
                <li key={sectionName}>
                  <Link to={sectionUrl}>{sectionName}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </header>
      <main>
        <ErrorBoundary>
          <Switch>
            {ROUTES.map((routeProps, index) => <Route key={index} {...routeProps}/>)}
          </Switch>
        </ErrorBoundary>
      </main>
    </Router>
  </article>
);
