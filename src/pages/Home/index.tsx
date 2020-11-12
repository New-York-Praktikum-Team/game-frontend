import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import { Store } from 'store';

export const Home: FC = () => (
  <Store.Consumer>
    {({ isLogged }) => (<section>
      <h1>Hello Nyma!</h1>
      <p>Our game is really awesome, you should definitely check it out!</p>
      {isLogged
        ? <p><Link to={AppUrls.Game}>PLAY NOW</Link></p>
        : <p>But first things first, <Link to={AppUrls.SignIn}>Sign In</Link></p>
      }
    </section>)}
  </Store.Consumer>
);
