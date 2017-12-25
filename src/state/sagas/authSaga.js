import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  REGISTER_WITH_EMAIL,
  LOGIN_WITH_EMAIL,
  CREATE_USER_DETAILS,
  FETCH_USER_WORKOUT,
  CREATE_USER_WORKOUT
} from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { Actions as Navigation } from 'react-native-router-flux';
import * as _ from 'lodash';
import * as firebase from 'firebase';

export function* watchSignUpEmailSaga() {
  yield takeLatest(REGISTER_WITH_EMAIL.REQUESTED, registerWithEmail);
  yield takeLatest(CREATE_USER_DETAILS.REQUESTED, createUserDetails);
}

export function* watchLoginEmailSaga() {
  yield takeLatest(LOGIN_WITH_EMAIL.REQUESTED, loginWithEmail);
}

export function* registerWithEmail(action) {
  const { email, password } = action;

  try {
    const { uid } = yield call(fire.auth.createUserWithEmailAndPassword, email, password);

    if (uid) {
      const payload = {
        email,
        password,
        fromWhere: 'register'
      };

      const loginResult = yield call(loginWithEmail, payload);

      if (loginResult) {
        createUserInDb(uid, email);
        yield call(Navigation.registerDetails);
      }
    }
  } catch (e) {
    const { code, message } = e;
    console.log('Error trying to register new account');
    console.log('Error code: ', code);
    console.log('Error message: ', message);
    yield put({ type: REGISTER_WITH_EMAIL.ERROR, message });
  }
}

export function* loginWithEmail(action) {
  const { email, password, fromWhere } = action;
  try {
    const { uid } = yield call(fire.auth.signInWithEmailAndPassword, email, password);
    if (uid) {
      yield put({ type: LOGIN_WITH_EMAIL.SUCCESS, uid, email });
      if (fromWhere === 'register') {
        return true;
      }
      if (fromWhere === 'login') {
        yield call(checkUserDetails, uid);
      }
    }

    yield call(Navigation.home);
    return false;
  } catch (error) {
    console.log('Error in login with email and password: ', email, password, error);
  }
}

export function createUserInDb(uid, email) {
  try {
    firebase.database().ref('users/' + uid).set({ uid, email });
  } catch (e) {
    console.log('Cannot set new user in database', e);
  }
}

export function* createUserDetails(action) {
  const { height, weight, gender, level, goal, age } = action.details;
  const state = yield select(state => state.auth);
  try {
    firebase.database().ref('users/' + state.uid).update({
      height, weight, gender, level, goal, age
    });
  } catch (e) {
    console.log('Error working with user details', e);
  } finally {
    yield call(fetchOrCreateWorkout);
    // yield call(Navigation.home);
  }
}

export function* checkUserDetails(uid) {
  const userDetails = yield call(fire.database.read, 'users/' + uid);

  if (userDetails) {
    if (!userDetails.weight ||
      !userDetails.height ||
      !userDetails.goal ||
      !userDetails.level ||
      !userDetails.gender ||
      !userDetails.age)
    {
      yield call(Navigation.registerDetails);
    } else {
      yield call(fetchOrCreateWorkout);
    }
  }
}

export function* fetchOrCreateWorkout() {
  const { uid } = yield select(state => state.auth);

  if (uid) {
    const userDetails = yield call(fire.database.read, 'users/' + uid);
    if (userDetails.workouts) {
      yield put({ type: FETCH_USER_WORKOUT.REQUESTED });
    } else {
      yield put({ type: CREATE_USER_WORKOUT.REQUESTED, details: userDetails });
    }
  }
}
