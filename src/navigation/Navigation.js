import React, { Component } from 'react';
import { BackHandler, ToastAndroid, StyleSheet, PixelRatio } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';

import WelcomeScreen from '../screens/Welcome';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import RegisterDetailsScreen from '../screens/RegisterDetails';
import RegisterDaysScreen from '../screens/RegisterDays';
import ExerciseDetails from '../components/ExerciseDetails';
import Profile from '../screens/Profile';
import CreateExercise from '../screens/CreateExercise';
import Users from '../screens/Users';

const TabIcon = ({ focused, iconName }) => {
  return (
    <Ionicons name={focused ? iconName : iconName + '-outline'} size={32} color='#2196F3' />
  );
};


export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doubleBackToExitPressedOnce: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    return true;
  }

  render() {
    return (
      <Router>
        <Stack key='root' hideNavBar>
          <Scene
            key='welcome'
            component={WelcomeScreen}
            type='reset'
            initial />
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
            tabs
            tabBarStyle={styles.tabBar}
            default='tab1'
            showIcon
            type='reset'
            tabBarPosition='bottom'
            hideNavBar
            showLabel={false}>
            <Scene key='tab1'
              iconName='ios-home'
              icon={TabIcon}
              component={HomeScreen}
              hideNavBar
              initial
            />
            <Scene key='tab2'
              iconName='ios-contact'
              icon={TabIcon}
              component={Profile}
              hideNavBar
            />
          </Scene>
          <Scene
            key='exerciseDetails'
            component={ExerciseDetails} />
          <Scene
            key='createExercise'
            component={CreateExercise} />
          <Scene
            key='manageUsers'
            component={Users} />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopColor: 'darkgrey',
    borderTopWidth: 1 / PixelRatio.get(),
    backgroundColor: 'ghostwhite',
    opacity: 0.98
  }
});
