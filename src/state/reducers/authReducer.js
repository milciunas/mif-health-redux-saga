import { Record, List } from 'immutable';
import { LOGIN_EMAIL_PASSWORD, FETCH_USER_WORKOUT, REGISTER_WITH_EMAIL, LOGIN_WITH_EMAIL } from '../actions/actionTypes';

const initialState = Record({
  uid: null,
  email: null,
  registrationError: '',
  workout: []
});

function setUser(state, action) {
  return state
    .set('uid', action.uid)
    .set('email', action.email);
}

function setUserWorkout(state, action) {
  return state.set('workout', action.workout);
}

function setRegistrationError(state, action) {
  return state.set('registrationError', action.message);
}

export default function(state = new initialState(), action) {
  switch (action.type) {
    case FETCH_USER_WORKOUT.SUCCESS:
      return setUserWorkout(state, action);
    case REGISTER_WITH_EMAIL.ERROR:
      return setRegistrationError(state, action);
    case LOGIN_WITH_EMAIL.SUCCESS:
      return setUser(state, action);
    default:
      return state;
  }
}
