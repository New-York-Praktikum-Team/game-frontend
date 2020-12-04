import { User } from 'interfaces';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/user/selectors';

export const useEnhance = () => {
  const profile: User | null = useSelector(userSelector);

  const backgroundImage = profile?.avatar ? `url('https://ya-praktikum.tech/${profile.avatar}')` : undefined;

  return { profile, backgroundImage };
};
