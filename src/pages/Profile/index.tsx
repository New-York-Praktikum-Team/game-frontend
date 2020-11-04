import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from '../../routes/appUrls';

export const Profile: FC = () => (
  <section>
    <h1>This is the Profile Page</h1>

    <Link to={AppUrls.Game}>Play the game</Link>
  </section>
);
