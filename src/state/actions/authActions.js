import { SIGN_UP_EMAIL, LOGIN_EMAIL } from './actionTypes';

export const signUpEmail = (email, password) => (
  console.log('email', email, 'password', password),
  {
    type: SIGN_UP_EMAIL.REQUESTED,
    email,
    password
  }
);

export const loginEmail = () => ({
  type: LOGIN_EMAIL.REQUESTED
});
