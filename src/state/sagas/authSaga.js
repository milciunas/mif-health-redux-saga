import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_EMAIL, LOGIN_EMAIL } from '../actions/actionTypes';
import fire from '../config/firebaseConfig';

export function* watchSignUpEmailSaga() {
  yield takeLatest(SIGN_UP_EMAIL.REQUESTED, signUpEmail);
}

export function* watchLoginEmailSaga() {
  yield takeLatest(LOGIN_EMAIL.REQUESTED, loginEmail);
}

export function* signUpEmail(action) {
  const { email, password } = action;
  console.log('SAGA', email, password);
  try {
    // const user = yield call(fire.auth.createUserWithEmailAndPassword, email, password);
    const user = yield call(fire.auth.createUserWithEmailAndPassword, email, password);
    console.log('uzer', user);
  } catch (e) {
    console.log(e);
  }
}

export function* loginEmail() {
  // try {
  // } catch (e) {

  // }
}
