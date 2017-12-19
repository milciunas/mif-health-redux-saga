import { SIGN_UP_EMAIL, LOGIN_EMAIL, LOGIN_EMAIL_PASSWORD, SIGN_UP_EMAIL_DETAILS } from './actionTypes';

export const signUpEmail = (email, password) => ({
  type: SIGN_UP_EMAIL.REQUESTED,
  email,
  password
});

export const signUpEmailDetails = (details) => ({
  type: SIGN_UP_EMAIL_DETAILS.REQUESTED,
  details
});

export const loginEmail = (email, password) => ({
  type: LOGIN_EMAIL.REQUESTED,
  email,
  password
});

export const loginEmailPassword = (uid, email) => ({
  type: LOGIN_EMAIL_PASSWORD,
  uid,
  email
});
