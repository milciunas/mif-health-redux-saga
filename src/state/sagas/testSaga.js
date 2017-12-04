import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_TEST } from '../actions/actionTypes';

export function* watchTestSaga() {
  yield takeLatest(FETCH_TEST.REQUESTED, fetchTest);
}

export function* fetchTest() {
  try {
    const data = [
      {
        id: '1',
        name: 'test'
      },
      {
        id: '2',
        name: 'test 2'
      },
      {
        id: '3',
        name: 'test 3'
      }
    ];

    yield put({ type: FETCH_TEST.SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: FETCH_TEST.ERROR, e });
  }
}
