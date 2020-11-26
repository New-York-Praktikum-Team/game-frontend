import React from 'react';
import { User } from 'interfaces';

interface StoreContext {
  isLogged: boolean;
  setLogged(logged: boolean):void;
  user: User | null;
  setUser(user: User): void;
  geolocation: Position | null;
}

export const Store = React.createContext<StoreContext>({
  isLogged: false,
  user: null,
  setLogged() {},
  setUser() {},
  geolocation: null,
});
