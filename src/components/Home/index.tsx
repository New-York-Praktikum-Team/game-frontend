import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Home: FC = () => (
  <section>
    <h1>Hello Nyma!</h1>
    <p>Our game is really awesome, you should definitely check it out! But first things first, </p>
    <Link to="/sign-in">Sign In</Link>
  </section>
);
