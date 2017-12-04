import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from '../screens/Login';

const tabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false,
  },
};

const AppNavigation = StackNavigator(
  {
    Login: {
      screen: LoginScreen
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