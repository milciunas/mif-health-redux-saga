import {
  GET_TODAYS_WORKOUT
} from './actionTypes';

export const getTodaysWorkout = (workout) => ({
  type: GET_TODAYS_WORKOUT.REQUESTED,
  workout
});
