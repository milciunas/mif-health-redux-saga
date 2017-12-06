import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    rootReducer, 
    compose(applyMiddleware(sagaMiddleware, logger))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
