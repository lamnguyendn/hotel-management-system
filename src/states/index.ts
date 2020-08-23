import * as roomSagas from './room';
import { all } from 'redux-saga/effects';

export function* rootSaga(): Generator {
  yield all([roomSagas.sagas]);
}
