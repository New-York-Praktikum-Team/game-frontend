import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import { RootState } from 'store/reducers';
import { useSelector } from 'react-redux';
import './Home.css';

export const Home: FC = () => {
  const userStatus = useSelector((state: RootState) => state.user.status);
  const isLogged = userStatus === 'success';

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
