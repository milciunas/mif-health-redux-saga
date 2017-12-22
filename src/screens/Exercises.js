import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';
import ExerciseComponent from '../components/Exercise';
import moment from 'moment';

// const weekday = moment().weekday();
const weekday = moment().day() - 1;

class Exercises extends Component {
  static propTypes = {
    exercises: PropTypes.array
  }

  render() {
    let exercisesWithDay;
    const exercisesList = [];

    this.props.exercises.map(exercises => {
      exercises.map(e => {
        if (e.day && e.day === weekday) {
          exercisesWithDay = exercises;
        }
      });
    });

    if (exercisesWithDay) {
      const exercisesCleaned = exercisesWithDay.map(e => {
        if(e.id) {
          exercisesList.push(e);
        }
      });
      exercisesWithDay = exercisesCleaned;
    }

    console.log('Exercises', exercisesList);

    const stuff = [];
    for (let i = 0; i < 10; i++) {
      stuff.push({ text: 'Training nr: ' + i, id: i });
    }

    return (
      <View style={styles.screen}>
        <FlatList
          data={exercisesList}
          renderItem={({ item }) =>
            <ExerciseComponent
              key={item.id}
              {...item}
            />
          }
        />
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
