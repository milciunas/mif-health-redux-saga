import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/Welcome';

const tabNavigatorConfig = {
  tabBarOptions: {
    showLabel: false
  }
};

const AppNavigation = StackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen
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
