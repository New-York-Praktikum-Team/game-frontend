import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';

export const NotFound: FC = () => (
  <section>
    <div>Whoops, there is nothing here!</div>
    <Link to={AppUrls.Home}>Home</Link>
  </section>
);
