import { Action } from 'redux';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchRoom } from '../../apis/room';
import {
  ROOM_FETCH_FAILED,
  ROOM_FETCH_REQUESTED,
  ROOM_FETCH_SUCCEEDED,
} from './types';

type SomeAction = { payload: { roomId: string } } & Action;

function* fetchRoomSaga(action: SomeAction): Generator {
  try {
    const { payload } = action;
    const room = yield call(fetchRoom, payload.roomId);
    yield put({ type: ROOM_FETCH_SUCCEEDED, room });
  } catch (e) {
    yield put({ type: ROOM_FETCH_FAILED, message: e.message });
  }
}

function* roomWatcher(): Generator {
  yield takeEvery(ROOM_FETCH_REQUESTED, fetchRoomSaga);
}

export function* roomSaga(): Generator {
  yield all([roomWatcher]);
}
