import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ExerciseComponent from '../components/Exercise';

class Exercises extends Component {
  render() {
    const stuff = [];
    for (let i = 0; i < 10; i++) {
      stuff.push({ text: 'Training nr: ' + i, id: i });
    }

    const test = stuff.map(item => {
      return (<ExerciseComponent key={item.id} text={item.text} />);
    });

    return (
      <View style={styles.screen}>
        {test}
      </View>
    );
  }
}

export default Exercises;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
