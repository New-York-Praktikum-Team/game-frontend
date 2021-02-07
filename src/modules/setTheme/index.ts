import { store } from 'store/store';

export const setThemeStyles = (): void => {
  const { theme } = store.getState().themes;

  if (theme) {
    const root = document.documentElement;

    Object.entries(theme.json).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  }
};
