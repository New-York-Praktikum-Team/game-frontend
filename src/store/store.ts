import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { ItemActionType } from './user/actions';

import { RootState, rootReducer } from './rootReducer';

type DispatchFunctionType = ThunkDispatch<RootState, undefined, ItemActionType>;

function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware<DispatchFunctionType, RootState>(thunkMiddleware),
  );
  return store;
}

export const store = configureStore();
