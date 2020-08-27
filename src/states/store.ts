import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import { rootReducer, rootSaga } from '.';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}): Store<any> => {
  const middlewares = [routerMiddleware(history), sagaMiddleware];

  const store = createStore(
    rootReducer(),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  // sagaMiddleware.run(rootSaga);
  const sagaTask = sagaMiddleware.run(rootSaga).toPromise();
  sagaTask.catch((e) => {
    console.log('eeee:', e);
  });

  return store;
};

export default configureStore;
