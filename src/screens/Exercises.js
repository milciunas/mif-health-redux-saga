import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { PropTypes } from 'prop-types';
import ExerciseComponent from '../components/Exercise';

class Exercises extends Component {
  static propTypes = {
    exercises: PropTypes.array
  }

  _keyExtractor = (item) => item.id;

  render() {
    return (
      <View style={styles.screen}>
        {
          this.props.exercises.length > 0 ?
            <FlatList
              data={this.props.exercises}
              keyExtractor={this._keyExtractor}
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
