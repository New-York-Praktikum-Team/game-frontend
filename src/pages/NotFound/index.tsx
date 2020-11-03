import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound: FC = () => (
  <section>
    <div>Whoops, there is nothing here!</div>
    <Link to="/">Home</Link>
  </section>
);
