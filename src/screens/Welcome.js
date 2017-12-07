import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchTest } from '../state/actions/testActions';

class WelcomeScreen extends Component {
  static propTypes = {
    fetchTest: PropTypes.func.isRequired,
    navigation: PropTypes.object
  }

  componentDidMount() {
    this.props.fetchTest();
  }

  navigateToRegister = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Button
            title={'Register'}
            onPress={this.navigateToRegister}
          />
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
