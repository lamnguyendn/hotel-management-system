import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from '.';
import { GlobalState } from './types';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState: GlobalState = {}): Store<GlobalState> => {
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
