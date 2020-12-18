import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { sagas as roomSagas } from './room';
import { roomReducers } from './room/reducers';

export function* rootSaga(): Generator {
  yield all([fork(roomSagas.roomSaga)]);
}

export function rootReducer(history: History<unknown>): any {
  return combineReducers({
    router: connectRouter(history),
    rooms: roomReducers,
  });
}
