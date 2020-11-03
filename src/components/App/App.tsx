import React, { FC } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';

export const App: FC = () => (
  <ErrorBoundary>
    <div />
  </ErrorBoundary>
);
