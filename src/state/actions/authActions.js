import {
  SIGN_UP_EMAIL,
  LOGIN_EMAIL,
  LOGIN_EMAIL_PASSWORD,
  SIGN_UP_EMAIL_DETAILS,
  CREATE_WORKOUT_DAYS,
  FETCH_USER_WORKOUT
} from './actionTypes';

export const signUpEmail = (email, password) => ({
  type: SIGN_UP_EMAIL.REQUESTED,
  email,
  password
});

export const signUpEmailDetails = (details) => ({
  type: SIGN_UP_EMAIL_DETAILS.REQUESTED,
  details
});

export const signUpEmailDetailsDone = (details) => ({
  type: SIGN_UP_EMAIL_DETAILS.SUCCESS,
  details
});

export const loginEmail = (email, password) => ({
  type: LOGIN_EMAIL.REQUESTED,
  email,
  password
});

export const loginEmailPassword = (uid, email) => ({
  type: LOGIN_EMAIL_PASSWORD,
  uid,
  email
});

export const createWorkoutDays = (days) => ({
  type: CREATE_WORKOUT_DAYS.REQUESTED,
  days
});

export const fetchUserWorkout = () => ({
  type: FETCH_USER_WORKOUT.REQUESTED
});

export const storeUserWorkout = (workout) => ({
  type: FETCH_USER_WORKOUT.SUCCESS,
  workout
});
