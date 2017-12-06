import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_TEST } from '../actions/actionTypes';
import fire from '../config/firebaseConfig';

export function* watchTestSaga() {
  yield takeLatest(FETCH_TEST.REQUESTED, fetchTest);
}

export function* fetchTest() {
  try {
    //CREATE ITEM IN TABLE

    // firebase.database().ref('exercises/' + 0).set({
    //   'description' : '',
    //   'level' : '',
    //   'muscle' : '',
    //   'name' : 'bicycling',
    //   'reps' : 1,
    //   'sets' : 1,
    //   'type' : '',
    //   'image' : ''
    // });

    const exercises = yield call(fire.database.read, 'exercises');

    yield put({ type: FETCH_TEST.SUCCESS, exercises });
  } catch (e) {
    yield put({ type: FETCH_TEST.ERROR, e });
  }
}
