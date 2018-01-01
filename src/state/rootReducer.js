import { combineReducers } from 'redux';
import auth from './reducers/authReducer';
import admin from './reducers/adminReducer';

export default combineReducers({
  auth,
  admin
});
