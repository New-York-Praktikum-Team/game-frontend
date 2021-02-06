import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';

export const themesSelector = createSelector(
  (state: RootState) => state.themes.themes,
  (themes) => themes,
);
