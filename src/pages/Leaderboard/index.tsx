import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from '../../routes/appUrls';

export const Leaderboard: FC = () => (
  <section>
    <h1>Leaderboard</h1>

    <p>Looks like there are no any leaders right now.</p>
    <p>Become a first one, </p>

    <Link to={AppUrls.Game}>Play the game!</Link>
  </section>
);
