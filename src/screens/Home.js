import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserWorkout } from '../state/actions/authActions';
import Exercises from './Exercises';

class HomeScreen extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  render() {
    console.log('What do we have in user state', this.props.user);
    console.log('What do we have in user state', this.props.user.workout);

    return (
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <Exercises exercises={this.props.user.workout}/>
        </ScrollView>
      </View>
    );
  }
}

const actionsToProps = {
  fetchUserWorkout
};

const mapStateToProps = state => ({
  user: state.auth
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
