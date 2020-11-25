import React, { FC } from 'react';
import { Offline } from 'react-detect-offline';
import './Offline.css';

export const OfflineMessage: FC = () => (
    <Offline>
      <div className="offline">
        <span className="offline__message">No internet connection. Application functionality is limited!</span>
      </div>
    </Offline>
);
