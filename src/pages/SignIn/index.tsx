import React, { FC, SyntheticEvent, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { AppUrls } from '../../routes/appUrls';

export const SignIn: FC<RouteComponentProps> = ({ history }: RouteComponentProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({ login, password });
    history.push('/profile');
  };

  return (
    <section>
      <h1>This is the Sign In Page.</h1>

      <ul>
        <li>
          <Link to={AppUrls.SignUp}>I dont have an account</Link>
        </li>
        <li>
          <Link to={AppUrls.Home}>I&apos;d rather get back home</Link>
        </li>
      </ul>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="login">
          <div>Login</div>
          <input
            type="text"
            name="login"
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <div>Password</div>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">
          Alright, just let me in
        </button>
      </form>

    </section>
  );
};
