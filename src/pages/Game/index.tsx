import { GameCanvas } from 'components/GameCanvas';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import { PageMeta } from 'components/PageMeta/PageMeta';
import './Game.css';

export const Game: FC = () => (
  <section className="game-wrapper">
    <PageMeta title="Play game" description="Play the game and earn points!"/>

    <h1>Nyma</h1>

    <ul>
      <li>
        <Link to={AppUrls.Leaderboard}>Leaderboard</Link>
      </li>
      <li>
        <Link to={AppUrls.Home}>Back home</Link>
      </li>
    </ul>

    <GameCanvas />

  </section>

);
