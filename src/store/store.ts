import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { ItemActionType } from './reducers/user';

import reducer, { RootState } from './reducers/index';

type DispatchFunctionType = ThunkDispatch<RootState, undefined, ItemActionType>;

function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware<DispatchFunctionType, RootState>(thunkMiddleware),
  );
  return store;
}

export const store = configureStore();
