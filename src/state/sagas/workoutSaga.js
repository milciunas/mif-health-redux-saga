import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  SIGN_UP_EMAIL,
  LOGIN_EMAIL,
  LOGIN_EMAIL_PASSWORD,
  SIGN_UP_EMAIL_DETAILS,
  CREATE_WORKOUT_DAYS,
  FETCH_USER_WORKOUT
} from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { actions as Navigation } from 'react-native-router-flux';
import * as _ from 'lodash';
import * as firebase from 'firebase';

// TODO IMPLEMENT REPS
const gainReps = {
  sets: 2,
  reps: 20
};

const lossReps = {
  sets: 3,
  reps: 8
};

const muscleGroups = [
  {
    chest: 'chest/abs'
  },
  {
    back: 'traps/middle_back/lats/lower_back'
  },
  {
    arms: 'biceps/forearm/triceps'
  },
  {
    shoulders: 'shoulders'
  },
  {
    legs: 'quads/hamstrings/glutes/calves'
  },
  {
    cardio: 'cardio'
  }
];

export function* watchWorkoutSaga() {
  yield takeLatest(SIGN_UP_EMAIL_DETAILS.SUCCESS, createWorkout);
  yield takeLatest(LOGIN_EMAIL_PASSWORD.SUCCESS, createWorkoutAfterlogin);
  yield takeLatest(FETCH_USER_WORKOUT.REQUESTED, fetchUserWorkout);
}

export function* createWorkoutAfterlogin(action) {
  const userDetails = yield call(getUserDetails, action);

  if (userDetails && !userDetails.workout) {
    yield call(createWorkout, userDetails);
  }
}

export function* createWorkout(action) {
  const workoutMuscles = yield call(getWorkoutMuscleGroups, action);
  const workoutDays = yield call(getWorkoutDays, workoutMuscles.length);
  const exercises = yield call(fire.database.read, 'exercises');

  const workout = yield call(createWorkoutByDay, action, workoutMuscles, workoutDays, exercises);

  console.log('workout wtf', workout);

  if (workout.length > 0) {
    yield call(fire.database.patch, 'users/' + action.uid + '/' + action.key, {
      workout
    });
  }
}

export function* getUserDetails(action) {
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

        return null;
      } else {
        userData['key'] = key;
        return userData;
      }
    }
  }
}

export function getWorkoutMuscleGroups(details) {
  const { weight, height, goal, level, gender, age } = details;

  if (goal === 'gain') {
    if (level === 'beginner') {
      if (age >= 16 && age <= 50) {
        return [
          'chest/shoulders',
          'cardio/legs',
          'back/arms'
        ];
      } else {
        return [
          'legs/back/chest',
          'arms/shoulders/cardio'
        ];
      }
    } else {
      if (age >= 16 && age <= 50) {
        return [
          'chest/arms',
          'legs/cardio',
          'back/arms',
          'shoulders/cardio'
        ];
      } else {
        return [
          'legs/back/chest',
          'arms/shoulders/cardio',
          'legs/back/chest/cardio'
        ];
      }
    }
  } else {
    if (level === 'beginner') {
      if (age >= 16 && age <= 50) {
        return [
          'chest/cardio',
          'legs',
          'back/arms',
          'cardio'
        ];
      } else {
        return [
          'legs/back/chest',
          'shoulders/arms/cardio',
          'legs/back/chest',
          'cardio'
        ];
      }
    } else {
      if (age >= 16 && age <= 50) {
        return [
          'chest/shoulders',
          'legs/cardio',
          'back/arms',
          'cardio'
        ];
      } else {
        return [
          'legs/back/chest',
          'shoulders/arms/cardio',
          'legs/back/chest',
          'cardio'
        ];
      }
    }
  }
}

export function getWorkoutDays(workoutLength) {
  if (workoutLength <= 2) {
    return [ 'Tuesday', 'Thursday' ];
  } else if (workoutLength === 3) {
    return [ 'Monday', 'Wednesday', 'Friday' ];
  } else if (workoutLength === 4) {
    return [ 'Monday', 'Tuesday', 'Thursday', 'Friday' ];
  } else if (workoutLength === 5) {
    return [ 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday' ];
  }
}

export function createWorkoutByDay(details, muscles, days, exercises) {
  const workoutByDay = [];

  for(let i = 0; i < days.length; i++) {
    const muscleGroupToTrain = muscles[i].split('/');

    muscleGroupToTrain.forEach(trainGroup => {
      muscleGroups.map(muscleGroup => {
        for (const group in muscleGroup) {
          if (trainGroup === group) {
            for (const name in muscleGroup) {
              if (name === group) {
                const musclesToFind = muscleGroup[name].split('/');
                musclesToFind.forEach(muscle => {
                  const exercise = findExercise(muscle, details, exercises);
                  if (exercise.length > 0) {
                    console.log('is exercise an array???', exercise);
                    exercise.push({
                      'day': getDayNumber(days[i]),
                      'workout_id': i
                    });
                    workoutByDay.push(exercise);
                  }
                });
              }
            }
          }
        }
      });
    });
  }

  console.log('Created workout ', workoutByDay);
  return workoutByDay;
}

export function getDayNumber(day) {
  if (day === 'Monday') {
    return 1;
  } else if (day === 'Tuesday') {
    return 2;
  } else if (day === 'Wednesday') {
    return 3;
  } else if (day === 'Thursday') {
    return 4;
  } else if (day === 'Friday') {
    return 5;
  } else if (day === 'Saturday') {
    return 6;
  } else if (day === 'Sunday') {
    return 7;
  }
}

export function findExercise(muscleToFind, details, exercises) {
  //FIND EXERCISE BY SOME PROPERTY
  const result = exercises.filter((exercise) => {
    let result;
    if (exercise.muscle.toLowerCase() === muscleToFind ) {
      if (exercise.level.toLowerCase() === details.level) {
        result = exercise.muscle.toLowerCase();
      }
    }
    return result;
  });

  return result;
}

Array.prototype.randomExercise = function() {
  return this[Math.floor(Math.random() * this.length)];
};

export function* fetchUserWorkout() {
  const state = yield select(state => state.auth);
  const user = yield call(fire.database.read, 'users/' + state.uid);
  let workout;

  if (user) {
    let key;
    for(const id in user) {
      key = id;
    }

    if (key) {
      workout = yield call(fire.database.read, 'users/' + state.uid + '/' + key + '/workout');
    }
  }
  console.log('workout from user', workout);
  if (workout.length > 0) {
    yield put({ type: FETCH_USER_WORKOUT.SUCCESS, workout });
  }
}
