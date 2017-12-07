import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchTest } from '../state/actions/testActions';
import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});

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
          <Form type={User} />
          <Button title={'Register'} style={{ borderWidth: 1 }} onPress={() => {}}/>
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
    justifyContent: 'center',
    marginTop: 50,
    padding: 20
  }
});
