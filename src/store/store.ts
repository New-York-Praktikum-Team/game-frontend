import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { isServer } from 'modules/isServer';
import { ItemActionType } from './user/actions';
import { RootState, rootReducer } from './rootReducer';

type DispatchFunctionType = ThunkDispatch<RootState, undefined, ItemActionType>;

function configureStore() {
  const store = createStore(
    rootReducer,
    // eslint-disable-next-line no-underscore-dangle
    isServer ? undefined : window.__INITIAL_STATE__,
    applyMiddleware<DispatchFunctionType, RootState>(thunkMiddleware),
  );
  return store;
}

export const store = configureStore();
