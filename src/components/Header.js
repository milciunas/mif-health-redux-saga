import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Actions as Navigation } from 'react-native-router-flux';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
    onBackText: PropTypes.func,
    action: PropTypes.func,
    actionText: PropTypes.string
  }

  renderBack = () => { return Navigation.pop(); }

  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={{ flex: 0.2, paddingLeft: 10 }}
          onPress={this.props.onBack ? this.props.onBack : this.renderBack}>
          <Text style={styles.headerBackText}>
            {this.props.onBackText ? this.props.onBackText : 'Back'}
          </Text>
        </TouchableOpacity>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
        <View style={{ flex: 0.2, paddingRight: 10 }}>
          {
            this.props.action ?
              <TouchableOpacity
                onPress={this.props.action}>
                <Text style={styles.headerBackText}>{this.props.actionText}</Text>
              </TouchableOpacity> : null
          }
        </View>
      </View>
    );
  }
}

export default connect(null, null)(Header);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600'
  },
  headerBackText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#2196F3'
  }
});
