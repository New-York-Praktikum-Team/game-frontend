import React, { FC } from 'react';
import { AppUrls } from 'routes/appUrls';
import { NavLink } from 'react-router-dom';
import { Store } from 'store';
import './Navigation.css';

const {
  SignIn, Game, Home, Leaderboard, Profile, SignUp,
} = AppUrls;

const privateLinks = {
  Home, Game, Leaderboard, Profile,
};

const publicLinks = {
  Home, SignIn, SignUp,
};

export const Navigation: FC = () => (
  <Store.Consumer>
    {({ isLogged }) => (
      <nav className="navigation">
        <ul>
           {
            Object.entries(isLogged ? privateLinks : publicLinks).map(([name, url]) => (
              <li key={url}>
                <NavLink exact={true} className="navigation__a" to={url}>{name}</NavLink>
              </li>
            ))
           }
        </ul>
      </nav>
    )}
  </Store.Consumer>
);
