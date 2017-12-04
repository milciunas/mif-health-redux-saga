import { FETCH_TEST } from '../actions/actionTypes';

const INITIAL_STATE = {
  data: []
}

export default function test(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_TEST.REQUESTED:
      return {
        ...state
      };
    case FETCH_TEST.SUCCESS:
      return {
        data: action.payload
      };
    case FETCH_TEST.ERROR:
      return {
        ...state
      };
    default:
      return state;
  }  
}
