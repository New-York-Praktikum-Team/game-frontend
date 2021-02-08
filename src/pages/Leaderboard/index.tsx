import React, { FC, useEffect } from 'react';
// @ts-ignore
import dollar from 'assets/images/dollar.png';
import { PageMeta } from 'components/PageMeta/PageMeta';
import { store } from 'store/store';
import { fetchLeaderboard } from 'store/leaderboard/thunks';
import { useEnhance } from './useEnhance';
import './Leaderboard.css';

export const Leaderboard: FC = () => {
  const { leaderboard } = useEnhance();

  useEffect(() => {
    store.dispatch(fetchLeaderboard);
  }, []);

  return (
    <section className="leaderboard-wrapper">
      <PageMeta title="Leaderboard" description="The best players are displayed on this page"/>

      <h1>Leaderboard</h1>

      <table className="table table-leaderboard">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {leaderboard.length
          ? leaderboard.map(({ data: { name = 'Anonymous', nymaScore = 0 } }, index) => (
            <tr key={index}>
              <td>
                <span>{name}</span>
              </td>
              <td>
                <img className="table-leaderboard__image" src={dollar} alt="dollar" />
                <span>{nymaScore}</span>
              </td>
            </tr>
          ))
          : (
            <tr>
              <td colSpan={2}>
                <span>The rating has not been formed yet</span>
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </section>
  );
};
