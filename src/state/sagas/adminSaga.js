import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_USERS, DELETE_USER, MAKE_ADMIN
} from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { Actions as Navigation } from 'react-native-router-flux';
import * as firebase from 'firebase';

export function* watchAdminSaga() {
  yield takeLatest(GET_USERS.REQUESTED, getUsers);
  yield takeLatest(DELETE_USER.REQUESTED, deleteUser);
  yield takeLatest(MAKE_ADMIN.REQUESTED, makeAdmin);
}

export function* getUsers() {
  try {
    const userslist = yield call(fire.database.read, 'users');
    const users = [];

    for (const userkey in userslist) {
      if (userslist[userkey]) {
        users.push(userslist[userkey]);
      }
    }

    yield put({ type: GET_USERS.SUCCESS, users });
  } catch (e) {
    console.log('Error while fetching users', e);
  }
}

export function* deleteUser() {
  const currentUser = firebase.auth().currentUser;

  try {
    currentUser.delete();
    yield call(fire.database.delete, 'users/' + currentUser.uid);
  } catch (e) {
    console.log('Error while deleting user', e);
  } finally {
    yield call(Navigation.welcome);
  }
}

export function makeAdmin(action) {
  firebase.database()
    .ref('users/' + action.user.uid)
    .update({ type: 'admin' })
    .catch((error) => {
      console.log('Error making user admin');
    });
}
