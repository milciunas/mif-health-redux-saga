import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Actions as Navigation } from 'react-native-router-flux';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    return (
      <View style={styles.container}>
        <Button 
          title={ this.props.title ? this.props.title : 'Back' } 
          onPress={() => Navigation.pop()} />
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
