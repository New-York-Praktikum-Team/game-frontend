import { Theme } from 'interfaces';
import { BaseActionType } from '../types';

export enum ThemesActions {
  FETCH_THEMES_REQUEST = '@@user/FETCH_THEMES_REQUEST',
  FETCH_THEMES_SUCCESS = '@@user/FETCH_THEMES_SUCCESS',
  FETCH_THEMES_ERROR = '@@user/FETCH_THEMES_ERROR',

  SET_USER_THEME_REQUEST = '@@user/SET_USER_THEME_REQUEST',
  SET_USER_THEME_SUCCESS = '@@user/SET_USER_THEME_SUCCESS',
  SET_USER_THEME_ERROR = '@@user/SET_USER_THEME_ERROR',
}

export interface ThemesActionType extends BaseActionType<ThemesActions> {
  themes: Theme[];
}

export interface SetThemeActionType extends BaseActionType<ThemesActions> {
  theme: Theme;
}

export function fetchThemesRequest(): BaseActionType<ThemesActions> {
  return { type: ThemesActions.FETCH_THEMES_REQUEST };
}

export function fetchThemesSuccess(themes: Theme[]): ThemesActionType {
  return { type: ThemesActions.FETCH_THEMES_SUCCESS, themes };
}

export function fetchThemesError(): BaseActionType<ThemesActions> {
  return { type: ThemesActions.FETCH_THEMES_ERROR };
}

export function setUserThemeRequest(): BaseActionType<ThemesActions> {
  return { type: ThemesActions.SET_USER_THEME_REQUEST };
}

export function setUserThemeSuccess(theme: Theme): SetThemeActionType {
  return { type: ThemesActions.SET_USER_THEME_SUCCESS, theme };
}

export function setUserThemeError(): BaseActionType<ThemesActions> {
  return { type: ThemesActions.SET_USER_THEME_ERROR };
}
