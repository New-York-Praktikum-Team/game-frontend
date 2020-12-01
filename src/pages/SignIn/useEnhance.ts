import { useSelector } from 'react-redux';
import { authError } from 'store/auth/selectors';
import { isLogged, userLogin } from 'store/user/selectors';

export const useEnhance = () => {
  const isUserLogged = useSelector(isLogged);
  const login = useSelector(userLogin);
  const signInError = useSelector(authError);

  return { isUserLogged, login, signInError };
};
