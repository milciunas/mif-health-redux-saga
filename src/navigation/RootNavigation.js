import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Register';

const tabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false
  }
};

const AppNavigation = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
    },
    Register: {
      screen: RegisterScreen
    },
    Main: {
      screen: MainTabNavigator
    }
  },
  {
    navigationOptions: () => ({
      header: null
    })
  },
  tabNavigatorConfig
);

export default class RootNavigation extends Component {
  render() {
    return <AppNavigation/>;
  }
}
