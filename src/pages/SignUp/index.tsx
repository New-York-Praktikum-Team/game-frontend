import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from '../../routes/appUrls';

export const SignUp: FC = () => (
  <section>
    <h1>This is the Sign Up Page.</h1>

    <ul>
      <li>
        <Link to={AppUrls.SignIn}>I already have an account</Link>
      </li>
      <li>
        <Link to={AppUrls.Home}>I&apos;d rather get back home</Link>
      </li>
    </ul>
  </section>
);
