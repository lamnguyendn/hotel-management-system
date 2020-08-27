import { sagas as roomSagas } from './room';
import { all, fork } from 'redux-saga/effects';
import { roomReducers } from './room/reducers';
import { connectRouter } from 'connected-react-router';
import { history } from './store';
import { combineReducers } from 'redux';

export function* rootSaga(): Generator {
  yield all([fork(roomSagas.roomSaga)]);
}

export function rootReducer() {
  return combineReducers({
    router: connectRouter(history),
    rooms: roomReducers,
  });
}
