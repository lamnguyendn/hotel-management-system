import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { sagas as roomSagas } from './room';
import { roomReducers } from './room/reducers';
const sagaMiddleware = createSagaMiddleware();

const configureStore = (
  initialState = {},
  history = createBrowserHistory()
): Store<any, AnyAction> => {
  //
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(
    combineReducers({ ...roomReducers, router: routerReducer }),
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(roomSagas);

  return store;
};

export default configureStore;
