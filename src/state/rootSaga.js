import { spawn, all } from 'redux-saga/effects';
import { watchTestSaga } from './sagas/testSaga';

function* rootSaga() {
  yield all([
    spawn(watchTestSaga)
  ]);
}

export default rootSaga;
