import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppUrls } from 'routes/appUrls';
import { loggedSelector } from 'store/user/selectors';
import { PageMeta } from 'components/PageMeta/PageMeta';
import './Home.css';

export const Home: FC = () => {
  const isLoggedIn = useSelector(loggedSelector);

  return (
    <section className="home">
      <PageMeta title="Numa Game" description="A fun and mischievous game"/>

      <h1>Hello Nyma!</h1>
      <p>Our game is really awesome, you should definitely check it out!</p>
      {isLoggedIn
        ? <p><Link to={AppUrls.Game}>PLAY NOW</Link></p>
        : <p>But first things first, <Link to={AppUrls.SignIn}>Sign In</Link></p>
      }
    </section>
  );
};
