import { call, put, takeLatest } from 'redux-saga/effects';
import { SIGN_UP_EMAIL, LOGIN_EMAIL, LOGIN_EMAIL_PASSWORD } from '../actions/actionTypes';
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
  try {
    const user = yield call(fire.auth.createUserWithEmailAndPassword, email, password);
    console.log('signUpEmail', user);
    if (user) {
      yield call(loginEmailPassword, email, password, user.uid);
      yield call(Navigation.registerDetails);
    }
  } catch (e) {
    console.log(e);
  }
}

function* loginEmailPassword(email, password, uid) {
  try {
    const success = yield call(fire.auth.signInWithEmailAndPassword, email, password);
    if (success) {
      yield put({ type: LOGIN_EMAIL_PASSWORD.SUCCESS, uid, email });
    }
  } catch (error) {
    console.log('Error in login with email and password: ', email, password, uid, error);
  }
}

export function* loginEmail(action) {
  const { email, password } = action;
  try {
    const { uid } = yield call(fire.auth.signInWithEmailAndPassword, email, password);

    console.log('asdasd', uid);
    if (uid) {
      yield put({ type: LOGIN_EMAIL_PASSWORD.SUCCESS, uid, email });
      // NAVIGATE TO MAIN WITH ROUTER_FLUX
      yield call(Navigation.home);
    }
  } catch (e) {
    console.log(e);
  }
}
