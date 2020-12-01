import { useSelector } from 'react-redux';
import { authError, isAuthentificated } from 'store/auth/selectors';
import { isLogged, userLogin } from 'store/user/selectors';

export const useEnhance = () => {
  const isUserLogged = useSelector(isLogged);
  const login = useSelector(userLogin);
  const isSuccessfullyRegistered = useSelector(isAuthentificated);
  const signUpError = useSelector(authError);

  return {
    isUserLogged, login, isSuccessfullyRegistered, signUpError,
  };
};
