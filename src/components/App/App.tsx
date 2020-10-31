import React, { FC } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import { Profile } from '../../pages/Profile';
import { SignUp } from '../../pages/SignUp';
import { Home } from '../../pages/Home';
import { SignIn } from '../../pages/SignIn';
import { Game } from '../../pages/Game';
import { Leaderboard } from '../../pages/Leaderboard';

export const App: FC = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/sign-in">
          <SignIn />
        </Route>

        <Route exact path="/sign-up">
          <SignUp />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>

        <Route exact path="/play">
          <Game />
        </Route>

        <Route exact path="/leaderboard">
          <Leaderboard />
        </Route>

        <Route>
          <div>Whoops, there is nothing here!</div>
          <Link to="/">Home</Link>
        </Route>
      </Switch>
    </Router>
  </div>
);
