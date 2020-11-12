import { Canvas } from 'components/Canvas';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import './Game.css';

export const Game: FC = () => (
  <section className="game-wrapper">
    <h1>Nyma</h1>

    <ul>
      <li>
        <Link to={AppUrls.Leaderboard}>Leaderboard</Link>
      </li>
      <li>
        <Link to={AppUrls.Home}>Back home</Link>
      </li>
    </ul>

    <Canvas></Canvas>

  </section>

);
