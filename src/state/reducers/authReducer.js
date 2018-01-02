import { Record } from 'immutable';
import { FETCH_USER_WORKOUT, REGISTER_WITH_EMAIL, REGISTER_WITH_EMAIL_START,
  LOGIN_WITH_EMAIL, CREATE_USER_DETAILS, LOGIN_ANONYMOUSLY } from '../actions/actionTypes';

const initialState = Record({
  uid: null,
  email: null,
  details: null,
  registrationError: '',
  loginError: '',
  loading: false,
  registerLoading: false,
  exercises: []
});

function setUser(state, action) {
  return state
    .set('uid', action.uid)
    .set('email', action.email);
}

function setAnonymousUser(state, action) {
  return state.set('uid', action.uid);
}

function setUserWorkout(state, action) {
  return state.set('exercises', action.exercises).set('loading', false);
}

function setRegistrationError(state, action) {
  return state.set('registrationError', action.message);
}

function setLoading(state) {
  return state.set('loading', true);
}

function storeUserDetails(state, action) {
  return state.set('details', action.details).set('loading', false);
}

function setLoginError(state, action) {
  return state.set('loginError', action.message).set('loading', false);
}

function setRegisterLoading(state, action) {
  return state.set('registerLoading', action.loading);
}

export default function(state = new initialState(), action) {
  switch (action.type) {
    case FETCH_USER_WORKOUT.SUCCESS:
      return setUserWorkout(state, action);
    case FETCH_USER_WORKOUT.REQUESTED:
      return setLoading(state, action);
    case REGISTER_WITH_EMAIL_START.REQUESTED:
      return setRegisterLoading(state, action);
    case REGISTER_WITH_EMAIL_START.SUCCESS:
      return setRegisterLoading(state, action);
    case REGISTER_WITH_EMAIL.ERROR:
      return setRegistrationError(state, action);
    case LOGIN_WITH_EMAIL.REQUESTED:
      return setLoading(state);
    case LOGIN_WITH_EMAIL.SUCCESS:
      return setUser(state, action);
    case LOGIN_ANONYMOUSLY.SUCCESS:
      return setAnonymousUser(state, action);
    case LOGIN_WITH_EMAIL.ERROR:
      return setLoginError(state, action);
    case CREATE_USER_DETAILS.REQUESTED:
      return setLoading(state, action);
    case CREATE_USER_DETAILS.SUCCESS:
      return storeUserDetails(state, action);
    default:
      return state;
  }
}
