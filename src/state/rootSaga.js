import { spawn, all } from 'redux-saga/effects';
import { watchTestSaga } from './sagas/testSaga';
import { watchSignUpEmailSaga, watchLoginEmailSaga } from './sagas/authSaga';

function* rootSaga() {
  yield all([
    spawn(watchTestSaga),
    spawn(watchSignUpEmailSaga),
    spawn(watchLoginEmailSaga)
  ]);
}

export default rootSaga;
