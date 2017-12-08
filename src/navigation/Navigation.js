import React, { Component } from 'react';
import { Router, Scene, Stack } from 'react-native-router-flux';

import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';

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
            key='home'
            component={HomeScreen} />
        </Stack>
      </Router>
    );
  }
}
