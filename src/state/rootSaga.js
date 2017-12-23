import { fork } from 'redux-saga/effects';
import { watchSignUpEmailSaga, watchLoginEmailSaga } from './sagas/authSaga';
import { watchWorkoutSaga } from './sagas/workoutSaga';

export default function* rootSaga() {
  yield fork(watchSignUpEmailSaga);
  yield fork(watchLoginEmailSaga);
  yield fork(watchWorkoutSaga);
}
