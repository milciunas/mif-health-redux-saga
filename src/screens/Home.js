import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getTodaysWorkout } from '../state/actions/workoutActions';
import Exercises from './Exercises';

class HomeScreen extends Component {
  static propTypes = {
    exercises: PropTypes.array,
    loading: PropTypes.bool
  }

  render() {
    console.log('HOME props ', this.props);
    console.log('HOME props ', this.props.loading);
    if (this.props.loading) {
      return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size='large' color='#0000ff' />;
    }

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
  exercises: state.auth.exercises,
  loading: state.auth.loading
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
