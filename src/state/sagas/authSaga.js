import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  SIGN_UP_EMAIL,
  LOGIN_EMAIL,
  LOGIN_EMAIL_PASSWORD,
  SIGN_UP_EMAIL_DETAILS,
  CREATE_WORKOUT_DAYS
} from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { Actions as Navigation } from 'react-native-router-flux';
import * as _ from 'lodash';

export function* watchSignUpEmailSaga() {
  yield takeLatest(SIGN_UP_EMAIL.REQUESTED, signUpEmail);
  yield takeLatest(SIGN_UP_EMAIL_DETAILS.REQUESTED, emailDetails);
  yield takeLatest(LOGIN_EMAIL_PASSWORD.SUCCESS, createUserInDatabase);
  yield takeLatest(CREATE_WORKOUT_DAYS.REQUESTED, createWorkoutDays);
}

export function* watchLoginEmailSaga() {
  yield takeLatest(LOGIN_EMAIL.REQUESTED, loginEmail);
}

export function* signUpEmail(action) {
  const { email, password } = action;
  try {
    const user = yield call(fire.auth.createUserWithEmailAndPassword, email, password);
    // yield call(fire.auth.sendEmailVerification);
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

    if (uid) {
      yield put({ type: LOGIN_EMAIL_PASSWORD.SUCCESS, uid, email });
    }
  } catch (e) {
    console.log(e);
  }
}

export function* createUserInDatabase(action) {
  const user = yield call(fire.database.read, 'users/' + action.uid);

  if (user) {
    let key;
    for(const id in user) {
      key = id;
    }

    if (key) {
      const userData = yield call(fire.database.read, 'users/' + action.uid + '/' + key);
      if (!userData.weight ||
          !userData.height ||
          !userData.goal ||
          !userData.level ||
          !userData.gender ||
          !userData.age) {

        yield call(Navigation.registerDetails);
      } else {
        yield call(Navigation.home);
      }
    }
  } else {
    yield call(fire.database.create, 'users/' + action.uid, {
      uid: action.uid,
      email: action.email
    });
  }
}

export function* emailDetails(action) {
  const { height, weight, gender, level, goal, age } = action.details;
  const { details } = action;
  const state = yield select(state => state.auth);
  const user = yield call(fire.database.read, 'users/' + state.uid);

  if (user) {
    let key;
    for(const id in user) {
      key = id;
    }

    if (key) {
      yield call(fire.database.patch, 'users/' + state.uid + '/' + key, {
        height, weight, gender, level, goal, age
      });
    }
  }

  yield call(Navigation.home);
  yield put({ type: SIGN_UP_EMAIL_DETAILS.SUCCESS, details });
}

export function* createWorkoutDays(action) {
  // MAP DAYS SOMEHOW AND GENERATE A WORKOUT
  switch (action.days) {
    case 1:
      yield call(createOneDayWorkout);
      break;
    default:
      yield call(createThreeDayWorkout);
  }
  yield;
}

function* createOneDayWorkout() {
  const exercises = yield call(fire.database.read, 'exercises');
  // yield call(Navigation.home);
}

function* createThreeDayWorkout() {
  yield call(Navigation.home);
}
