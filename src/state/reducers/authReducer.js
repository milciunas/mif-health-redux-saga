import { Record } from 'immutable';
import { FETCH_USER_WORKOUT, REGISTER_WITH_EMAIL, LOGIN_WITH_EMAIL } from '../actions/actionTypes';

const initialState = Record({
  uid: null,
  email: null,
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
  console.log('loading is true');
  return state.set('loading', true);
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
    default:
      return state;
  }
}
