import { Dispatch } from 'react';
import { BaseActionType } from 'store/types';
import * as api from 'modules/api';
import {
  ThemesActionType,
  ThemesActions,
  fetchThemesError,
  fetchThemesRequest,
  fetchThemesSuccess,
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
