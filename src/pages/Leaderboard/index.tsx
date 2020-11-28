import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { AppUrls } from 'routes/appUrls';
import dollar from 'assets/images/dollar.png';
import './Leaderboard.css';

interface LeaderValue {
  id: string;
  displayName: string;
  points: string;
}

const leaderData: LeaderValue[] = [
  { id: '23', displayName: 'Vasya Pupkin', points: '1000' },
  { id: '528', displayName: 'Masha Masha', points: '850' },
  { id: '134', displayName: 'Lenka Penka', points: '333' },
];

export const Leaderboard: FC = () => (
  <section className='leaderboard-wrapper'>
    <h1>Leaderboard</h1>

    {leaderData.length
      ? <div className='leader-table'>
        {leaderData.map((leader, index) => (
          <div className='row' key={index}>
            <div className='col'>{index + 1}</div>
            <div className='col'>{leader.displayName}</div>
            <div className='col'><img className='image' src={dollar} alt='dollar' />&nbsp;{leader.points}</div>
          </div>
        ))}
      </div>
      : <p>Be the first leader</p>
    }

    <Link to={AppUrls.Game}>Play Nyma!</Link>
  </section>
);
