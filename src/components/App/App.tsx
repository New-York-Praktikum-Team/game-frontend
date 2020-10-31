import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Profile } from '../Profile';
import { SignUp } from '../SignUp';
import { Home } from '../Home';
import { SignIn } from '../SignIn';
import { Game } from '../Game';

export const App: FC = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/sign-in">
          <SignIn />
        </Route>

        <Route path="/sign-up">
          <SignUp />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  </div>
);
