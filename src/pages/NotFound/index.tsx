import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import './NotFound.css';
import { PageMeta } from 'components/PageMeta/PageMeta';

export const NotFound: FC = () => (
  <section className="not-found">
    <PageMeta title="404" description="Whoops, there is nothing here!" />
    <h1>Whoops, there is nothing here!</h1>
    <Link to={AppUrls.Home}>Home</Link>
  </section>
);
