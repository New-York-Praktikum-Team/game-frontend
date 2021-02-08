import { Theme } from 'interfaces';
import { BaseActionType } from '../types';

export enum ThemesActions {
  FETCH_THEMES_REQUEST = '@@theme/FETCH_THEMES_REQUEST',
  FETCH_THEMES_SUCCESS = '@@theme/FETCH_THEMES_SUCCESS',
  FETCH_THEMES_ERROR = '@@theme/FETCH_THEMES_ERROR',

  SET_USER_THEME_REQUEST = '@@theme/SET_USER_THEME_REQUEST',
  SET_USER_THEME_SUCCESS = '@@theme/SET_USER_THEME_SUCCESS',
  SET_USER_THEME_ERROR = '@@theme/SET_USER_THEME_ERROR',

  GET_USER_THEME_REQUEST = '@@theme/GET_USER_THEME_REQUEST',
  GET_USER_THEME_SUCCESS = '@@theme/GET_USER_THEME_SUCCESS',
  GET_USER_THEME_ERROR = '@@theme/GET_USER_THEME_ERROR',
}

export interface ThemesActionType extends BaseActionType<ThemesActions> {
  themes: Theme[];
}

export interface SetThemeActionType extends BaseActionType<ThemesActions> {
  theme: Theme;
}

export interface GetThemeActionType extends BaseActionType<ThemesActions> {
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

export function getUserThemeRequest(): BaseActionType<ThemesActions> {
  return { type: ThemesActions.GET_USER_THEME_REQUEST };
}

export function getUserThemeSuccess(theme: Theme): GetThemeActionType {
  return { type: ThemesActions.GET_USER_THEME_SUCCESS, theme };
}

export function getUserThemeError(): BaseActionType<ThemesActions> {
  return { type: ThemesActions.GET_USER_THEME_ERROR };
}
