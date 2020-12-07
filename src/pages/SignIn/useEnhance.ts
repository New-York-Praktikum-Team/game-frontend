import { useSelector } from 'react-redux';
import { authErrorSelector } from 'store/auth/selectors';
import { loggedSelector, userLoginSelector } from 'store/user/selectors';

export const useEnhance = () => {
  const isUserLogged = useSelector(loggedSelector);
  const login = useSelector(userLoginSelector);
  const signInError = useSelector(authErrorSelector);

  return { isUserLogged, login, signInError };
};
