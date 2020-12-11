import React, { FC, useEffect } from 'react';
import dollar from 'assets/images/dollar.png';
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
    <section className='leaderboard-wrapper'>
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
          ? leaderboard.map(({ data: { name = 'Anonymous', numaScore = 0 } }, index) => (
            <tr key={index}>
              <td>
                <span>{name}</span>
              </td>
              <td>
                <img className='table-leaderboard__image' src={dollar} alt='dollar' />
                <span>{numaScore}</span>
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
