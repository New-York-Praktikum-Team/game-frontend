import React from 'react';
import { User } from 'interfaces';

interface StoreContext {
  isLogged: boolean,
  setLogged(logged: boolean):void,
  user: User | null
  setUser(user: User): void
}

export const Store = React.createContext<StoreContext>({
  isLogged: false,
  user: null,
  setLogged() {},
  setUser() {},
});
