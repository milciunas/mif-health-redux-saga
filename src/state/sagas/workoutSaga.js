import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  FETCH_USER_WORKOUT,
  CREATE_USER_WORKOUT,
  REGENERATE_WORKOUT,
  CREATE_EXERCISE
} from '../actions/actionTypes';
import fire from '../config/firebaseConfig';
import { Actions as Navigation } from 'react-native-router-flux';
import * as firebase from 'firebase';
import moment from 'moment';

export function* watchWorkoutSaga() {
  yield takeLatest(FETCH_USER_WORKOUT.REQUESTED, fetchUserWorkout);
  yield takeLatest(CREATE_USER_WORKOUT.REQUESTED, createWorkout);
  yield takeLatest(REGENERATE_WORKOUT.REQUESTED, regenerateWorkout);
  yield takeLatest(CREATE_EXERCISE.REQUESTED, createExercise);
}

export function* createWorkout({ details }) {
  const workoutMuscles = yield call(getWorkoutMuscleGroups, details);
  const workoutDays = yield call(getWorkoutDays, workoutMuscles.length);
  const exercises = yield call(fire.database.read, 'exercises');

  try {
    const response = yield call(createWorkoutByDay, details, workoutMuscles, workoutDays, exercises);

    if (response) {
      yield put({ type: FETCH_USER_WORKOUT.REQUESTED });
    }
  } catch (e) {
    console.log('Error while creating a workout in user profile', e);
  } finally {
    yield call(Navigation.home);
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
          'cardio/arms/shoulders'
        ];
      }
    } else {
      if (age >= 16 && age <= 50) {
        return [
          'chest/arms',
          'cardio/legs',
          'back/arms',
          'cardio/shoulders'
        ];
      } else {
        return [
          'legs/back/chest',
          'cardio/arms/shoulders',
          'cardio/legs/back/chest'
        ];
      }
    }
  } else {
    if (level === 'beginner') {
      if (age >= 16 && age <= 50) {
        return [
          'cardio/chest',
          'legs',
          'back/arms',
          'cardio'
        ];
      } else {
        return [
          'legs/back/chest',
          'cardio/shoulders/arms',
          'legs/back/chest',
          'cardio'
        ];
      }
    } else {
      if (age >= 16 && age <= 50) {
        return [
          'chest/shoulders',
          'cardio/legs',
          'back/arms',
          'cardio'
        ];
      } else {
        return [
          'legs/back/chest',
          'cardio/shoulders/arms',
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
  const muscleGroups = [
    {
      chest: 'chest/abs'
    },
    {
      back: 'traps/middle_back/lats/lower_back'
    },
    {
      arms: 'biceps/forearms/triceps'
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

  for(let i = 0; i < days.length; i++) {
    const muscleGroupToTrain = muscles[i].split('/');
    const workoutByDay = [];
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
                    exercise['muscle_type'] = exercise[0].muscle.toLowerCase();
                    workoutByDay.push(exercise);
                  }
                });
              }
            }
          }
        }
      });
    });

    const workout = calculateWorkoutSize(workoutByDay, details);

    if (workout.length > 0) {
      const day = getDayNumber(days[i]);
      const workout_id = `workout_day_${day}`;
      const todaysDate = moment().format('YYYY-M-D');

      firebase.database().ref('users/' + details.uid + '/workouts/').child(workout_id).set({
        day: day,
        created: todaysDate,
        exercises: workout
      });
    }
  }
  return true;
}

export function calculateWorkoutSize(workout, details) {
  const exercisesPerWorkout = Math.floor(10 / workout.length);
  const result = [];
  const gain = {
    beginner: {
      sets: 2,
      reps: 10
    },
    intermediate: {
      sets: 2,
      reps: 20
    }
  };

  const loss = {
    beginner: {
      sets: 2,
      reps: 8
    },
    intermediate: {
      sets: 3,
      reps: 8
    }
  };

  workout.map(w => {
    if (w[0].type === 'Cardio') {
      const exercise = w.getExercise();

      if (exercise) {
        if (details.goal === 'gain') {
          exercise['duration'] = '10min.';
        } else {
          exercise['duration'] = '20min.';
        }

        removeExercise(w, exercise);
        result.push(exercise);
      }
    } else {
      for (let i = 0; i < exercisesPerWorkout; i++) {
        const exercise = w.getExercise();

        if (exercise) {
          if (details.level.toLowerCase() === 'beginner') {
            if (details.goal === 'gain') {
              exercise['sets_x_reps'] = gain.beginner.sets + 'x' + gain.beginner.reps;
            } else {
              exercise['sets_x_reps'] = loss.beginner.sets + 'x' + loss.beginner.reps;
            }
          } else {
            if (details.goal === 'gain') {
              exercise['sets_x_reps'] = gain.intermediate.sets + 'x' + gain.intermediate.reps;
            } else {
              exercise['sets_x_reps'] = loss.intermediate.sets + 'x' + loss.intermediate.reps;
            }
          }

          removeExercise(w, exercise);
          result.push(exercise);
        }
      }
    }
  });

  return result;
}

function removeExercise(workout, exercise) {
  const index = workout.indexOf(exercise);

  if (index !== -1) {
    workout.splice(index, 1);
  }
}

Array.prototype.getExercise = function() {
  return this[Math.floor(Math.random() * this.length)];
};

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
  const result = exercises.filter((exercise) => {
    let result;
    if (exercise.muscle.toLowerCase() === muscleToFind &&
      exercise.type.toLowerCase() === 'strength' ||
      exercise.type.toLowerCase() === muscleToFind) {
      if (exercise.level.toLowerCase() === details.level) {
        result = exercise.muscle.toLowerCase();
      }
    }
    return result;
  });

  return result;
}

export function* fetchUserWorkout(action) {
  const state = yield select(state => state.auth);
  const weekday = moment().isoWeekday();

  try {
    const workouts = yield call(fire.database.read, 'users/' + state.uid + '/workouts');
    let exercises;

    if (workouts) {
      for (const w in workouts) {
        const workout = workouts[w];
        if (workout) {
          if (action.day) {
            if (action.day === workout.day) {
              exercises = workout.exercises;
            }
          } else {
            if (weekday === workout.day) {
              exercises = workout.exercises;
            } else {
              exercises = null;
            }
          }
        }
      }

      yield put({ type: FETCH_USER_WORKOUT.SUCCESS, exercises });
    }
  } catch (e) {
    console.log('Error while fetching user workout', e);
  }
}

export function* regenerateWorkout() {
  const state = yield select(state => state.auth);

  try {
    const userDetails = yield call(fire.database.read, 'users/' + state.uid);

    yield call(createWorkout, { details: userDetails });
  } catch (e) {
    console.log('error while regenerating workout', e);
  }
}

export function* createExercise(action) {
  const state = yield select(state => state.auth);
  let id;

  // const query = firebase.database().ref('exercises/').limitToLast(1);
  // const ids = query.once('value').then((snap) => {
  //   const item = snap.val();
  //   for (const itemid in item) {
  //     id = Number(itemid) + 1;
  //     return id;
  //   }
  // });

  // console.log('id', ids);
}
