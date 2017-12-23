import {
  REGISTER_WITH_EMAIL,
  LOGIN_WITH_EMAIL,
  CREATE_USER_DETAILS,
  FETCH_USER_WORKOUT,
  CREATE_USER_WORKOUT
} from './actionTypes';

export const storeUserWorkout = (workout) => ({
  type: FETCH_USER_WORKOUT.SUCCESS,
  workout
});

export const registerWithEmail = (email, password) => ({
  type: REGISTER_WITH_EMAIL.REQUESTED,
  email,
  password
});

export const loginWithEmail = (email, password, fromWhere) => ({
  type: LOGIN_WITH_EMAIL.REQUESTED,
  email,
  password,
  fromWhere
});

export const setUserAfterRegistration = (uid, email) => ({
  type: LOGIN_WITH_EMAIL.SUCCESS,
  uid,
  email
});

export const createUserDetails = (details) => ({
  type: CREATE_USER_DETAILS.REQUESTED,
  details
});

export const fetchUserWorkout = () => ({
  type: FETCH_USER_WORKOUT.REQUESTED
});

export const createUserWorkout = (details) => ({
  type: CREATE_USER_WORKOUT.REQUESTED,
  details
});
