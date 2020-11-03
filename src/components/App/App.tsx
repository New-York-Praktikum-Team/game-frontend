import React, { FC } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { AppUrls } from '../../routes/appUrls';
import { ROUTES } from '../../routes/routes';

export const App: FC = () => (
  <article className="app">
    <Router>
      <header>
        <nav>
          <ul>
            {
              Object.keys(AppUrls).map((sectionName) => {
                // needed to cast a particular type as it was inferred as simple string
                const sectionUrl = AppUrls[(sectionName as keyof typeof AppUrls)];

                return (
                  <li key={sectionName}>
                    <Link to={sectionUrl}>{sectionName}</Link>
                  </li>
                );
              })
            }
          </ul>
        </nav>
      </header>

      <main>
        <Switch>
          {ROUTES.map((routeProps, index) => <Route key={index} {...routeProps}/>)}
        </Switch>
      </main>
    </Router>
  </article>
);
