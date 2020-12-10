import React, { FC } from 'react';
import dollar from 'assets/images/dollar.png';
import './Leaderboard.css';

interface LeaderValue {
  id: string;
  displayName: string;
  points: string;
}

const leaderData: LeaderValue[] = [
  { id: '23', displayName: 'Alex Naumov', points: '1000' },
  { id: '528', displayName: 'Masha Rasputina', points: '850' },
  { id: '134', displayName: 'Lenka Prokofieva', points: '333' },
];

export const Leaderboard: FC = () => (
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
      {leaderData.length
        ? leaderData.map((leader) => (
          <tr key={leader.id}>
            <td>
              <span>{leader.displayName}</span>
            </td>
            <td>
              <img className='table-leaderboard__image' src={dollar} alt='dollar' />
              <span>{leader.points}</span>
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
