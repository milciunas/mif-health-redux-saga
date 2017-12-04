import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMonitor = Reactotron.createSagaMonitor;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

export default () => {
  const store = Reactotron.createStore(
    rootReducer, 
    compose(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
