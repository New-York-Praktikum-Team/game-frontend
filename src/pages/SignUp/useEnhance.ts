import { useSelector } from 'react-redux';
import { authErrorSelector, authentificationSelector } from 'store/auth/selectors';
import { loggedSelector, userLoginSelector } from 'store/user/selectors';

export const useEnhance = () => {
  const isUserLogged = useSelector(loggedSelector);
  const login = useSelector(userLoginSelector);
  const isSuccessfullyRegistered = useSelector(authentificationSelector);
  const signUpError = useSelector(authErrorSelector);

  return {
    isUserLogged, login, isSuccessfullyRegistered, signUpError,
  };
};
