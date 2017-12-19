const createAsyncActionType = type => {
  return {
    REQUESTED: `${type}_REQUESTED`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
  };
};

export const FETCH_TEST = createAsyncActionType('FETCH_TEST');
export const SIGN_UP_EMAIL = createAsyncActionType('SIGN_UP_EMAIL');
export const SIGN_UP_EMAIL_DETAILS = createAsyncActionType('SIGN_UP_EMAIL_DETAILS');
export const LOGIN_EMAIL = createAsyncActionType('LOGIN_EMAIL');
export const LOGIN_EMAIL_PASSWORD = createAsyncActionType('LOGIN_EMAIL_PASSWORD');
export const CREATE_WORKOUT_DAYS = createAsyncActionType('CREATE_WORKOUT_DAYS');
