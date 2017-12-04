const createAsyncActionType = type => {
  return {
    REQUESTED: `${type}_REQUESTED`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
  };
};

export const FETCH_TEST = createAsyncActionType('fetch_test');
