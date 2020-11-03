import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from '../../routes/appUrls';

export const Home: FC = () => (
  <section>
    <h1>Hello Nyma!</h1>
    <p>Our game is really awesome, you should definitely check it out! But first things first, </p>
    <Link to={AppUrls.SignIn}>Sign In</Link>
  </section>
);
