import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppUrls } from 'routes/appUrls';
import { loggedSelector } from 'store/user/selectors';
import { PageMeta } from 'components/PageMeta/PageMeta';
import './Home.css';
import { store } from 'store/store';
import { fetchFeedback } from 'store/feedback/thunks';
import { useEnhance } from './useEnhance';

export const Home: FC = () => {
  useEffect(() => {
    store.dispatch(fetchFeedback);
  }, []);

  const { feedbackList } = useEnhance();

  const isLoggedIn = useSelector(loggedSelector);

  return (
    <section className="home">
      <PageMeta title="Numa Game" description="A fun and mischievous game" />

      <h1>Hello Nyma!</h1>
      <p>Our game is really awesome, you should definitely check it out!</p>
      {isLoggedIn
        ? <p><Link to={AppUrls.Game}>PLAY NOW</Link></p>
        : <p>But first things first, <Link to={AppUrls.SignIn}>Sign In</Link></p>
      }

      <table className="table table-feedback">
        <thead>
          <tr>
            <th>Name</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length
            ? feedbackList.map(({ text, user }, index) => (
              <tr key={index}>
                <td>
                  <span>{user}</span>
                </td>
                <td>
                  <span>{text}</span>
                </td>
              </tr>
            ))
            : (
              <tr>
                <td colSpan={2}>
                  <span>Be the first</span>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>

    </section>
  );
};
