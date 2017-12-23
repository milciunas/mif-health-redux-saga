import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  // SIGN_UP_EMAIL,
  LOGIN_EMAIL,
  // LOGIN_EMAIL_PASSWORD,
  // SIGN_UP_EMAIL_DETAILS,
  // CREATE_WORKOUT_DAYS,
  REGISTER_WITH_EMAIL,
  LOGIN_WITH_EMAIL,
  CREATE_USER_DETAILS
} from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { Actions as Navigation } from 'react-native-router-flux';
import * as _ from 'lodash';
import * as firebase from 'firebase';

export function* watchSignUpEmailSaga() {
  // yield takeLatest(SIGN_UP_EMAIL.REQUESTED, signUpEmail);
  // yield takeLatest(SIGN_UP_EMAIL_DETAILS.REQUESTED, emailDetails);
  // yield takeLatest(LOGIN_EMAIL_PASSWORD.SUCCESS, createUserInDatabase);
  // yield takeLatest(CREATE_WORKOUT_DAYS.REQUESTED, createWorkoutDays);
  yield takeLatest(REGISTER_WITH_EMAIL.REQUESTED, registerWithEmail);
  yield takeLatest(CREATE_USER_DETAILS.REQUESTED, createUserDetails);
}

export function* watchLoginEmailSaga() {
  // yield takeLatest(LOGIN_EMAIL.REQUESTED, loginEmail);
}

export function* registerWithEmail(action) {
  const { email, password } = action;

  try {
    const { uid } = yield call(fire.auth.createUserWithEmailAndPassword, email, password);

    if (uid) {
      const loginResult = yield call(loginWithEmail, uid, email, password);

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

function* loginWithEmail(uid, email, password) {
  try {
    const success = yield call(fire.auth.signInWithEmailAndPassword, email, password);
    if (success) {
      yield put({ type: LOGIN_WITH_EMAIL.SUCCESS, uid, email });
      return true;
    }

    return false;
  } catch (error) {
    console.log('Error in login with email and password: ', email, password, uid, error);
  }
}

function createUserInDb(uid, email) {
  try {
    firebase.database().ref('users/' + uid).set({ uid, email });
  } catch (e) {
    console.log('Cannot set new user in database', e);
  }
}

function* createUserDetails(action) {
  const { height, weight, gender, level, goal, age } = action.details;
  const state = yield select(state => state.auth);
  try {
    firebase.database().ref('users/' + state.uid).update({
      height, weight, gender, level, goal, age
    });
  } catch (e) {
    console.log('Error working with user details', e);
  } finally {
    yield call(Navigation.home);
  }
}

// export function* signUpEmail(action) {
//   const { email, password } = action;
//   try {
//     const user = yield call(fire.auth.createUserWithEmailAndPassword, email, password);
//     // yield call(fire.auth.sendEmailVerification);
//     if (user) {
//       yield call(loginEmailPassword, email, password, user.uid);
//       yield call(Navigation.registerDetails);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }


// function* loginEmailPassword(email, password, uid) {
//   try {
//     const success = yield call(fire.auth.signInWithEmailAndPassword, email, password);
//     if (success) {
//       yield put({ type: LOGIN_EMAIL_PASSWORD.SUCCESS, uid, email });
//     }
//   } catch (error) {
//     console.log('Error in login with email and password: ', email, password, uid, error);
//   }
// }

// export function* loginEmail(action) {
//   const { email, password } = action;
//   try {
//     const { uid } = yield call(fire.auth.signInWithEmailAndPassword, email, password);

//     if (uid) {
//       yield put({ type: LOGIN_EMAIL_PASSWORD.SUCCESS, uid, email });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// }

// export function* createUserInDatabase(action) {
//   const user = yield call(fire.database.read, 'users/' + action.uid);

//   if (user) {
//     let key;
//     for(const id in user) {
//       key = id;
//     }

//     if (key) {
//       const userData = yield call(fire.database.read, 'users/' + action.uid + '/' + key);
//       if (!userData.weight ||
//           !userData.height ||
//           !userData.goal ||
//           !userData.level ||
//           !userData.gender ||
//           !userData.age) {

//         yield call(Navigation.registerDetails);
//       } else {
//         yield call(Navigation.home);
//       }
//     }
//   } else {
//     yield call(fire.database.create, 'users/' + action.uid, {
//       uid: action.uid,
//       email: action.email
//     });
//   }
// }

// export function* emailDetails(action) {
//   const { height, weight, gender, level, goal, age } = action.details;
//   const { details } = action;
//   const state = yield select(state => state.auth);
//   const user = yield call(fire.database.read, 'users/' + state.uid);

//   if (user) {
//     let key;
//     for(const id in user) {
//       key = id;
//     }

//     if (key) {
//       yield call(fire.database.patch, 'users/' + state.uid + '/' + key, {
//         height, weight, gender, level, goal, age
//       });
//     }
//   }

//   yield call(Navigation.home);
//   yield put({ type: SIGN_UP_EMAIL_DETAILS.SUCCESS, details });
// }
