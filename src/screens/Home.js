import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Exercises from './Exercises';

import Header from '../components/Header';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <Header title={'Log off'}/>
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
