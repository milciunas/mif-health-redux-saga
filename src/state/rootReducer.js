import { combineReducers } from 'redux';
import test from './reducers/testReducer';
import authReducer from './reducers/authReducer';

export default combineReducers({
  test,
  authReducer
});
