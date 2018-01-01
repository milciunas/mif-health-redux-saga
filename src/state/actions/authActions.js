import {
  REGISTER_WITH_EMAIL,
  LOGIN_WITH_EMAIL,
  CREATE_USER_DETAILS,
  FETCH_USER_WORKOUT,
  CREATE_USER_WORKOUT,
  REGENERATE_WORKOUT,
  REGENERATE_USER_WORKOUT,
  CREATE_EXERCISE,
  GET_USERS,
  DELETE_USER,
  MAKE_ADMIN,
  LOGIN_ANONYMOUSLY
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

export const loginAnonymously = () => ({
  type: LOGIN_ANONYMOUSLY.REQUESTED
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

export const fetchUserWorkout = (day) => ({
  type: FETCH_USER_WORKOUT.REQUESTED,
  day
});

export const createUserWorkout = (details) => ({
  type: CREATE_USER_WORKOUT.REQUESTED,
  details
});

export const regenerateWorkout = () => ({
  type: REGENERATE_WORKOUT.REQUESTED
});

export const createExercise = (exercise) => ({
  type: CREATE_EXERCISE.REQUESTED,
  exercise
});

export const getUsers = () => ({
  type: GET_USERS.REQUESTED
});

export const deleteUser = () => ({
  type: DELETE_USER.REQUESTED
});

export const makeAdmin = (user) => ({
  type: MAKE_ADMIN.REQUESTED,
  user
});

export const regenerateUserWorkout = (user) => ({
  type: REGENERATE_USER_WORKOUT.REQUESTED,
  user
});
