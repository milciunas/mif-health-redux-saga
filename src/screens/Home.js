import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserWorkout } from '../state/actions/authActions';
import Exercises from './Exercises';

class HomeScreen extends Component {
  static propTypes = {
    fetchUserWorkout: PropTypes.func,
    workout: PropTypes.array
  }

  componentWillMount() {
    // this.props.fetchUserWorkout();
  }

  render() {
    return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <Exercises exercises={this.props.workout}/>
        </ScrollView>
      </View>
    );
  }
}

const actionsToProps = {
  fetchUserWorkout
};

const mapStateToProps = state => ({
  workout: state.auth.workout
});

export default connect(mapStateToProps, actionsToProps)(HomeScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    padding: 10
  }
});
