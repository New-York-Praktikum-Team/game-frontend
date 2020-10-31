import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const SignUp: FC = () => (
  <section>
    <h1>This is the Sign Up Page.</h1>

    <ul>
      <li>
        <Link to="/sign-in">I already have an account</Link>
      </li>
      <li>
        <Link to="/">I&apos;d rather get back home</Link>
      </li>
    </ul>
  </section>
);
