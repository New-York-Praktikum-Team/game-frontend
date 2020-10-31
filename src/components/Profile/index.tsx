import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Profile: FC = () => (
  <section>
    <h1>This is the Profile Page</h1>

    <Link to="/game">Play the game</Link>
  </section>
);
