import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getTodaysWorkout } from '../state/actions/workoutActions';
import Exercises from './Exercises';

class HomeScreen extends Component {
  static propTypes = {
    exercises: PropTypes.array
  }

  render() {
    console.log('HOME props ', this.props);
    return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <Exercises exercises={this.props.exercises}/>
        </ScrollView>
      </View>
    );
  }
}

const actionsToProps = {
  getTodaysWorkout
};

const mapStateToProps = state => ({
  exercises: state.auth.exercises
});

export default connect(mapStateToProps, actionsToProps)(HomeScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  }
});
