import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Game: FC = () => (
  <section>
    <h1>This is where Nyma lives!</h1>
    <p>They are going to be here very soon :)</p>

    <p>Meanwhile, you can</p>
    <ul>
      <li>
        <Link to="/">back home</Link>
      </li>
      <li>
        take a look at the
        {' '}
        <Link to="/leaderboard">leaderboard</Link>
      </li>
    </ul>

  </section>
);
