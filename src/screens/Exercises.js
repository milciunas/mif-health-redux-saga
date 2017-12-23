import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';
import ExerciseComponent from '../components/Exercise';
import moment from 'moment';

// const weekday = moment().weekday();
const weekday = moment().day();

class Exercises extends Component {
  static propTypes = {
    exercises: PropTypes.array
  }

  render() {
    console.log('this.props.exercises', this.props.exercises);

    let exercisesWithDay;
    const exercisesList = [];

    this.props.exercises.map(exercises => {
      exercises.map(e => {
        console.log('e', e);
        console.log('e day', e.day);
        console.log('weekday', weekday);
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
        {
          exercisesList.length > 0 ?
            <FlatList
              data={exercisesList}
              renderItem={({ item }) =>
                <ExerciseComponent
                  key={item.id}
                  {...item}
                />
              }
            /> :
            <View style={styles.emptyContainer}>
              <View style={styles.boxContainer}>
                <Text style={styles.emptyContainerText}>{'No exercises for today!'}</Text>
              </View>
            </View>
        }
      </View>
    );
  }
}

export default Exercises;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxContainer: {
    padding: 50,
    borderWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)'
  },
  emptyContainerText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: 'rgba(8,8,8,0.6)'
  }
});
