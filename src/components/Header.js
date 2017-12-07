import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

class Header extends Component {
  static propTypes = {
    screenProps: PropTypes.object
  }

  render() {
    const { goBack } = this.props.screenProps.navigation;
    return (
      <View style={styles.container}>
        <Button title={'Back'} onPress={() => goBack()} />
      </View>
    );
  }
}

export default connect(null, null)(Header);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0, 0.1)'
  }
});
