import { call, put, fork, all, takeLatest } from 'redux-saga/effects';
import { FETCH_TEST } from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import * as firebase from 'firebase';
import * as _ from 'lodash';

export function* watchTestSaga() {
  yield takeLatest(FETCH_TEST.REQUESTED, fetchTest);
}

export function* fetchTest() {
  try {
    //CREATE ITEM IN TABLE

    // for (let i = 0; i < 101; i++) {
    //   yield call(createExercise, i);
    // }


    const exercises = yield call(fire.database.read, 'exercises');
    const workout = [];
    const strength = [];
    const cardio = [];

    // THIS IS FOR CHECKING MULTIPLE GROUPS OF MUSCLES
    // const muscles = [ 'chest', 'quadriceps' ];
    // _.some(muscles, (el) => _.includes(exercise.muscle, el))

    if (exercises) {
      exercises.map(exercise => {
        if (_.includes(exercise.type, 'strength')) {
          strength.push(exercise);
        }

        if(_.includes(exercise.type, 'cardio')) {
          cardio.push(exercise);
        }
      });
    }

    workout.push(strength.randomElement());
    workout.push(cardio.randomElement());

    const workoutsFromIds = [];
    yield all(workout.map(exercise => {
      const ex = fork(fire.database.read, 'exercises/' + exercise.id);
      if (ex) {
        workoutsFromIds.push(ex);
      }
    }));

    const exercisess = yield call(fire.database.read, 'exercises');

    yield put({ type: FETCH_TEST.SUCCESS, exercisess });
  } catch (e) {
    yield put({ type: FETCH_TEST.ERROR, e });
  }
}

function* createExercise(id) {
  firebase.database().ref('exercises/' + id).set({
    'level' : '',
    'muscle' : '',
    'name' : '',
    'type' : '',
    'image_start' : '',
    'image_end' : '',
    'id': id
  });

  yield;
}

Array.prototype.randomElement = function() {
  return this[Math.floor(Math.random() * this.length)];
};
