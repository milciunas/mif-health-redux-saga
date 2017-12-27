import React, { Component } from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import RegisterDetailsScreen from '../screens/RegisterDetails';
import RegisterDaysScreen from '../screens/RegisterDays';
import ExerciseDetails from '../components/ExerciseDetails';

export default class Navigation extends Component {
  render() {
    return (
      <Router>
        <Stack key='root' hideNavBar={true}>
          <Scene
            key='welcome'
            component={WelcomeScreen} />
          <Scene
            key='register'
            component={RegisterScreen} />
          <Scene
            key='registerDetails'
            component={RegisterDetailsScreen} />
          <Scene
            key='registerDays'
            component={RegisterDaysScreen} />
          <Scene
            key='home'
            component={HomeScreen}
            type='reset' />
          <Scene
            key='exerciseDetails'
            component={ExerciseDetails} />
        </Stack>
      </Router>
    );
  }
}
