import { AnyAction } from 'redux';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { fetchRoom } from '../../apis/room';
import { ROOM_FETCH_FAILED, ROOM_FETCH_REQUESTED, ROOM_FETCH_SUCCEEDED } from './types';

function* fetchRoomSaga(action: AnyAction): Generator {
  try {
    const { payload } = action;
    const rooms = yield call(fetchRoom, payload.roomId);
    yield put({ type: ROOM_FETCH_SUCCEEDED, data: rooms });
  } catch (e) {
    yield put({ type: ROOM_FETCH_FAILED, error: e.message });
  }
}

function* roomWatcher(): Generator {
  yield takeEvery(ROOM_FETCH_REQUESTED, fetchRoomSaga);
}

export function* roomSaga(): Generator {
  yield all([fork(roomWatcher)]);
}
