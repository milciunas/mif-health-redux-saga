import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchTest } from '../state/actions/testActions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  fetchTest: () => dispatch(fetchTest())
});

class LoginScreen extends Component {
  static propTypes = {
    fetchTest: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchTest();
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <Text>Testing login screen</Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

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
