import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Exercises from './Exercises';
import { Actions as Navigation } from 'react-native-router-flux';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <Exercises />
        </ScrollView>
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
    padding: 10
  }
});
