import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Game: FC = () => (
  <section>
    <h1>This is where Nyma lives!</h1>
    <p>They are going to be here very soon :)</p>
    <Link to="/">Back Home</Link>
  </section>
);
