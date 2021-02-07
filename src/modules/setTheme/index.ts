import { Theme } from 'interfaces';
import { getUserThemeSuccess } from 'store/themes/actions';
import { store } from 'store/store';

export const applyThemeStyles = (theme: Theme) => {
  const root = document.documentElement;

  Object.entries(theme.json).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
};

export const setThemeStyles = (theme: Theme): void => {
  if (theme) {
    localStorage.setItem('theme', JSON.stringify(theme));
    applyThemeStyles(theme);
  }
};

export const getThemeFromCache = (): Theme | null => {
  const themeString = localStorage.getItem('theme');

  if (themeString) {
    const theme = JSON.parse(themeString);
    store.dispatch(getUserThemeSuccess(theme));
    applyThemeStyles(theme);
    return theme;
  }

  return null;
};
