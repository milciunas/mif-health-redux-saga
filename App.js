import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/state/configureStore';
import { Actions } from 'react-native-router-flux';
import Navigation from './src/navigation/Navigation';

const store = configureStore();

export default class App extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      Actions.pop();
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Navigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
