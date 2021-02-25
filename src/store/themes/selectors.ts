import { RootState } from 'store/rootReducer';
import { createSelector } from 'reselect';

export const themesSelector = createSelector(
  (state: RootState) => state.themes.themes,
  (themes) => themes,
);

export const themeSelector = createSelector(
  (state: RootState) => state.themes.theme,
  (theme) => theme,
);

export const themeIsLoading = createSelector(
  (state: RootState) => state.themes.isLoading,
  (isLoading) => isLoading,
);
