import { Theme, User } from 'interfaces';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/user/selectors';
import { themeSelector, themesSelector } from 'store/themes/selectors';

export const useEnhance = () => {
  const profile: User | null = useSelector(userSelector);
  const themes: Theme[] = useSelector(themesSelector);
  const theme = useSelector(themeSelector);

  const backgroundImage = profile?.avatar ? `url('https://ya-praktikum.tech/${profile.avatar}')` : undefined;

  return {
    profile, backgroundImage, themes, theme,
  };
};
