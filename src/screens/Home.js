import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Header from '../components/Header';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Header title={'Log off'}/>
        <View style={styles.container}>
          <Text>Render exercises</Text>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20
  }
});
