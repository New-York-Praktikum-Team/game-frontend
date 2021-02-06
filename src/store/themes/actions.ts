import { Theme } from 'interfaces';
import { BaseActionType } from '../types';

export enum ThemesActions {
  FETCH_THEMES_REQUEST = '@@user/FETCH_THEMES_REQUEST',
  FETCH_THEMES_SUCCESS = '@@user/FETCH_THEMES_SUCCESS',
  FETCH_THEMES_ERROR = '@@user/FETCH_THEMES_ERROR',
}

export interface ThemesActionType extends BaseActionType<ThemesActions> {
  themes: Theme[];
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
