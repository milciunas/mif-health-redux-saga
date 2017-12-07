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

  navigateToLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Button
            title={'Register'}
            onPress={this.navigateToLogin}
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
  },
  image: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    resizeMode: 'contain'
  }
});
