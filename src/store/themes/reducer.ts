import { Theme } from 'interfaces';
import { BaseActionType } from 'store/types';
import { ThemesActionType, ThemesActions } from 'store/themes/actions';

type ThemesReducer = {
  themes: Theme[];
  theme: Theme | null;
  isLoading: boolean;
};

const defaultReducer: ThemesReducer = {
  themes: [],
  theme: null,
  isLoading: true,
};

export function themesReducer(
  state: ThemesReducer = defaultReducer,
  action: BaseActionType<ThemesActions> | ThemesActionType,
): ThemesReducer {
  switch (action.type) {
    case ThemesActions.FETCH_THEMES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ThemesActions.FETCH_THEMES_SUCCESS:
      return {
        ...state,
        themes: (action as ThemesActionType).themes,
        isLoading: false,
      };
    case ThemesActions.FETCH_THEMES_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
