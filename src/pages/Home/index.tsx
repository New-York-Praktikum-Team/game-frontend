import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import { Store } from 'store';
import './Home.css';

export const Home: FC = () => {
  const { isLogged } = useContext(Store);

  return (
    <section className="home">
      <h1>Hello Nyma!</h1>
      <p>Our game is really awesome, you should definitely check it out!</p>
      {isLogged
        ? <p><Link to={AppUrls.Game}>PLAY NOW</Link></p>
        : <p>But first things first, <Link to={AppUrls.SignIn}>Sign In</Link></p>
      }
    </section>
  );
};
