import { Record } from 'immutable';
import { FETCH_USER_WORKOUT, REGISTER_WITH_EMAIL, LOGIN_WITH_EMAIL, CREATE_USER_DETAILS } from '../actions/actionTypes';

const initialState = Record({
  uid: null,
  email: null,
  details: null,
  registrationError: '',
  loading: false,
  exercises: []
});

function setUser(state, action) {
  return state
    .set('uid', action.uid)
    .set('email', action.email);
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
  return state.set('details', action.details);
}

export default function(state = new initialState(), action) {
  switch (action.type) {
    case FETCH_USER_WORKOUT.SUCCESS:
      return setUserWorkout(state, action);
    case FETCH_USER_WORKOUT.REQUESTED:
      return setLoading(state, action);
    case REGISTER_WITH_EMAIL.ERROR:
      return setRegistrationError(state, action);
    case LOGIN_WITH_EMAIL.REQUESTED:
      return setLoading(state);
    case LOGIN_WITH_EMAIL.SUCCESS:
      return setUser(state, action);
    case CREATE_USER_DETAILS.SUCCESS:
      return storeUserDetails(state, action);
    default:
      return state;
  }
}
