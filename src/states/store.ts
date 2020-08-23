import * as history from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '.';
import { roomReducers } from './room/reducers';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}): Store<any> => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history.createBrowserHistory()),
  ];

  const store = createStore(
    combineReducers({ ...roomReducers, router: routerReducer }),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
