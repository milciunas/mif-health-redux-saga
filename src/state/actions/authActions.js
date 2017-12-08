import { SIGN_UP_EMAIL, LOGIN_EMAIL } from './actionTypes';

export const signUpEmail = (email, password) => (
  {
    type: SIGN_UP_EMAIL.REQUESTED,
    email,
    password
  }
);

export const loginEmail = (email, password) => ({
  type: LOGIN_EMAIL.REQUESTED,
  email,
  password
});
