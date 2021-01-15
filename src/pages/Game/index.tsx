import { GameCanvas } from 'components/GameCanvas';
import React, { FC } from 'react';
import { PageMeta } from 'components/PageMeta/PageMeta';
import './Game.css';

export const Game: FC = () => (
  <section className="game-wrapper">
    <PageMeta title="Play game" description="Play the game and earn points!"/>
    <GameCanvas />
  </section>
);
