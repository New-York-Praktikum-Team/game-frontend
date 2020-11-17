import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import './NotFound.css';

export const NotFound: FC = () => (
  <section className="not-found">
    <h1>Whoops, there is nothing here!</h1>
    <Link to={AppUrls.Home}>Home</Link>
  </section>
);
