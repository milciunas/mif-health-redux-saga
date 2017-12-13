import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_EMAIL, LOGIN_EMAIL } from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { Actions as Navigation } from 'react-native-router-flux';

export function* watchSignUpEmailSaga() {
  yield takeLatest(SIGN_UP_EMAIL.REQUESTED, signUpEmail);
}

export function* watchLoginEmailSaga() {
  yield takeLatest(LOGIN_EMAIL.REQUESTED, loginEmail);
}

export function* signUpEmail(action) {
  const { email, password } = action;
  console.log('signUpEmail 1');
  try {
    const user = yield call(fire.auth.createUserWithEmailAndPassword, email, password);
    console.log('signUpEmail 2', user);
    if (user) {
      yield call(Navigation.registerDetails);
    }
  } catch (e) {
    console.log(e);
  }
}

export function* loginEmail(action) {
  const { email, password } = action;
  console.log('loginEmail 1');
  try {
    const data = yield call(fire.auth.signInWithEmailAndPassword, email, password);
    console.log('loginEmail 2');

    if (data) {
      console.log('me here');
      // NAVIGATE TO MAIN WITH ROUTER_FLUX
      yield call(Navigation.home);
    }
  } catch (e) {
    console.log(e);
  }
}
