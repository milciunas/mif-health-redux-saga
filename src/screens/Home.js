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

  constructor() {
    super();

    this.state = {
      shouldRender: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        shouldRender: true
      });
    }, 3000);
  }

  render() {
    console.log('HOME props ', this.props);
    console.log('HOME props ', this.props.loading);
    if (this.props.loading && !this.state.shouldRender) {
      return <ActivityIndicator
        style={styles.loadingIncidator}
        size='large'
        color='#2196F3' />;
    }

    return (
      <View style={styles.screen}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
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
  },
  loadingIncidator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
