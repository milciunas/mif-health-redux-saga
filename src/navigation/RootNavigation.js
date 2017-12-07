import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';

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
    Login: {
      screen: LoginScreen
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
