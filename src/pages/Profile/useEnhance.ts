import { useSelector } from 'react-redux';
import { user } from 'store/user/selectors';

export const useEnhance = () => {
  const profile = useSelector(user);

  return { profile };
};
