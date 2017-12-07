const createAsyncActionType = type => {
  return {
    REQUESTED: `${type}_REQUESTED`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`
  };
};

export const FETCH_TEST = createAsyncActionType('FETCH_TEST');
export const SIGN_UP_EMAIL = createAsyncActionType('SIGN_UP_EMAIL');
export const LOGIN_EMAIL = createAsyncActionType('LOGIN_EMAIL');
