import React, { FC } from 'react';
import { AppUrls } from 'routes/appUrls';
import { NavLink } from 'react-router-dom';
import { Store } from 'store';
import { AppRoute, ROUTES } from 'routes/routes';

const getLinks = (isPrivate: boolean):[string, string][] => {
  let routes: string[] = [];
  let result: [string, string][] = [];

  ROUTES.forEach((route: AppRoute) => {
    if (route.isPrivate === isPrivate) routes = [...routes, route.path as string];
  });

  Object.entries(AppUrls).forEach(([name, url]) => {
    if (routes.includes(url) || url === AppUrls.Home) result = [...result, [name, url]];
  });

  return result;
};

const publicLinks = getLinks(false);
const privateLinks = getLinks(true);

export const Navigation: FC = () => (
  <Store.Consumer>
    {({ isLogged }) => (
      <nav className="navigation">
        <ul>
          {
            (isLogged ? privateLinks : publicLinks).map(([name, url]) => (
              <li key={url}>
                <NavLink to={url}>{name}</NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    )}
  </Store.Consumer>
);
