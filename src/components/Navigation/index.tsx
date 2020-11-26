import React, { FC, useContext } from 'react';
import { AppUrls } from 'routes/appUrls';
import { NavLink } from 'react-router-dom';
import Flag from 'react-country-flag';
import { Store } from 'store';
import './Navigation.css';
import { useGeolocation } from 'hooks/useGeolocation';

const {
  SignIn, Game, Home, Leaderboard, Profile, SignUp,
} = AppUrls;

const privateLinks = {
  Home, Game, Leaderboard, Profile,
};

const publicLinks = {
  Home, Game, SignIn, SignUp,
};

export const Navigation: FC = () => {
  const { isLogged } = useContext(Store);
  const { geolocation } = useGeolocation();

  return (
    <nav className="navigation">
      <ul>
        {Object.entries(isLogged ? privateLinks : publicLinks).map(([name, url]) => (
          <li key={url}>
            <NavLink exact={true} className="navigation__a" to={url}>{name}</NavLink>
          </li>
        ))}
      </ul>

      {geolocation
      && <div className="navigation__country">
        <span>Country: </span>
        <Flag countryCode={geolocation.country.countryCode}/>
        <span className="navigation__country__name">{geolocation.country.countryName}</span>
      </div>}
    </nav>
  );
};
