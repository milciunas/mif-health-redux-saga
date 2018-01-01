import { Record } from 'immutable';
import { GET_USERS } from '../actions/actionTypes';

const initialState = Record({
  users: []
});

function setUsers(state, action) {
  return state.set('users', action.users);
}

export default function(state = new initialState(), action) {
  switch (action.type) {
    case GET_USERS.SUCCESS:
      return setUsers(state, action);
    default:
      return state;
  }
}
