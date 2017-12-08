import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_EMAIL, LOGIN_EMAIL } from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { NavigationActions } from 'react-navigation';

export function* watchSignUpEmailSaga() {
  yield takeLatest(SIGN_UP_EMAIL.REQUESTED, signUpEmail);
}

export function* watchLoginEmailSaga() {
  yield takeLatest(LOGIN_EMAIL.REQUESTED, loginEmail);
}

export function* signUpEmail(action) {
  const { email, password } = action;
  try {
    const user = yield call(fire.auth.createUserWithEmailAndPassword, email, password);
  } catch (e) {
    console.log(e);
  }
}

export function* loginEmail(action) {
  const { email, password } = action;
  try {
    const data = yield call(fire.auth.signInWithEmailAndPassword, email, password);
    
    if (data) {
      // NAVIGATE TO MAIN WITH ROUTER_FLUX
    }
  } catch (e) {
    console.log(e);
  }
}
