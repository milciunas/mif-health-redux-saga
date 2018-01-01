import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_USERS
} from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { Actions as Navigation } from 'react-native-router-flux';
import * as firebase from 'firebase';

export function* watchAdminSaga() {
  yield takeLatest(GET_USERS.REQUESTED, getUsers);
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
