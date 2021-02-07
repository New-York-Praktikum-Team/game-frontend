import { Dispatch } from 'react';
import { BaseActionType } from 'store/types';
import * as api from 'modules/api';
import {
  ThemesActionType,
  ThemesActions,
  fetchThemesError,
  fetchThemesRequest,
  fetchThemesSuccess,
  getUserThemeError,
  getUserThemeRequest,
  getUserThemeSuccess,
  setUserThemeError,
  setUserThemeRequest, setUserThemeSuccess,
} from 'store/themes/actions';

export async function fetchThemes(
  dispatch: Dispatch<ThemesActionType | BaseActionType<ThemesActions>>,
) {
  try {
    dispatch(fetchThemesRequest());
    const themes = await api.getThemes();
    dispatch(fetchThemesSuccess(themes));
  } catch (err) {
    dispatch(fetchThemesError());
  }
}

export const setUserTheme = (themeId: number) => (
  async (dispatch: Dispatch<BaseActionType<ThemesActions>>) => {
    try {
      dispatch(setUserThemeRequest());
      const theme = await api.setUserTheme(themeId);
      dispatch(setUserThemeSuccess(theme));
    } catch (err) {
      dispatch(setUserThemeError());
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
);

export const getUserTheme = () => (
  async (dispatch: Dispatch<BaseActionType<ThemesActions>>) => {
    try {
      dispatch(getUserThemeRequest());
      const theme = await api.getUserTheme();
      dispatch(getUserThemeSuccess(theme));
    } catch (err) {
      dispatch(getUserThemeError());
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
);
