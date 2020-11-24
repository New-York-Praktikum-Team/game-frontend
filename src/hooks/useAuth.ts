import { useEffect, useState } from 'react';
import * as api from 'modules/api';
import { User } from 'interfaces';

export const useAuth = () => {
  const [isReady, setReady] = useState<boolean>(false);
  const [isLogged, setLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.getUserInfo().then((result) => {
      setUser(result);
      setLogged(true);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    }).finally(() => {
      setReady(true);
    });
  }, []);

  return {
    isReady, isLogged, setLogged, user, setUser,
  };
};
