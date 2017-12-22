import { Record, List } from 'immutable';
import { LOGIN_EMAIL_PASSWORD, FETCH_USER_WORKOUT } from '../actions/actionTypes';

const initialState = Record({
  uid: null,
  email: null,
  workout: []
});

function loginUserEmailPassword(state, action) {
  return state
    .set('uid', action.uid)
    .set('email', action.email);
}

function setUserWorkout(state, action) {
  return state.set('workout', action.workout);
}

export default function(state = new initialState(), action) {
  switch (action.type) {
    case LOGIN_EMAIL_PASSWORD.SUCCESS:
      return loginUserEmailPassword(state, action);
    case FETCH_USER_WORKOUT.SUCCESS:
      return setUserWorkout(state, action);
    default:
      return state;
  }
}
