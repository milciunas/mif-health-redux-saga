import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/state/configureStore';
import RootNavigation from './src/navigation/RootNavigation';
import './src/state/logger/ReactotronConfig';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <RootNavigation />
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
