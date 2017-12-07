import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchTest } from '../state/actions/testActions';

class WelcomeScreen extends Component {
  static propTypes = {
    fetchTest: PropTypes.func.isRequired,
    exercises: PropTypes.array
  }

  componentDidMount() {
    this.props.fetchTest();
  }

  render() {
    const Exercises = this.props.exercises.map(exercise => {
      return (
        <View key={exercise.id} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>Id: {exercise.id}</Text>
          <Text>Name: {exercise.name}</Text>
        </View>
      );
    });

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text>Testing login screen</Text>
          {Exercises}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  exercises: state.test.exercises.toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchTest: () => dispatch(fetchTest())
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
