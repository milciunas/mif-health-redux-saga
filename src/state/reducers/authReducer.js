import { Record } from 'immutable';
import { LOGIN_EMAIL_PASSWORD } from '../actions/actionTypes';

const initialState = Record({
  uid: null,
  email: null
});

function loginUserEmailPassword(state, action) {
  return state
    .set('uid', action.uid)
    .set('email', action.email);
}

export default function(state = new initialState(), action) {
  switch (action.type) {
    case LOGIN_EMAIL_PASSWORD.SUCCESS:
      return loginUserEmailPassword(state, action);
    default:
      return state;
  }
}
