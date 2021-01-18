import { RootState } from 'store/rootReducer';

declare module '*.png';
declare module 'react-detect-offline';
declare module 'react-country-flag';

declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
  }
}
