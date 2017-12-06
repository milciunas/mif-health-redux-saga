import firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyB5BjfgXJmHXyk6ZPCsajtXxAOjj0K3mJg',
  authDomain: 'mif-health.firebaseapp.com',
  databaseURL: 'https://mif-health.firebaseio.com',
  projectId: 'mif-health',
  storageBucket: 'mif-health.appspot.com',
  messagingSenderId: '342939282652'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const fire = new ReduxSagaFirebase(firebaseApp);

export default fire;
