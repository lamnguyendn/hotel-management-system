import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { sagas as roomSagas } from './room';
import { roomReducers } from './room/reducers';
const sagaMiddleware = createSagaMiddleware();

const configureStore = (
  initialState = {},
  history = createBrowserHistory()
) => {
  //
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const composeEnhancers =
    global.window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

  const store = createStore(
    combineReducers({ ...roomReducers, router: routerReducer }),
    composeWithDevTools(applyMiddleware(middlewares))
  );

  sagaMiddleware.run(roomSagas);

  return store;
};

export default configureStore;
