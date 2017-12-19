import { combineReducers } from 'redux';
import test from './reducers/testReducer';
import auth from './reducers/authReducer';

export default combineReducers({
  test,
  auth
});
