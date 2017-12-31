import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Actions as Navigation } from 'react-native-router-flux';
import { Ionicons, Entypo } from '@expo/vector-icons';
import * as firebase from 'firebase';
import { regenerateWorkout } from '../state/actions/authActions';

class Profile extends Component {
  static propTypes = {
    details: PropTypes.object.isRequired,
    regenerateWorkout: PropTypes.func
  }

  logout = () => {
    firebase.auth().signOut();
    Navigation.welcome();
  }

  regenerateWorkout = () => {
    Alert.alert(
      'Do you really want to regenerate workout?',
      'This will create completely new workout!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => this.props.regenerateWorkout() }
      ],
      { cancelable: false }
    );
  }

  createExercise = () => {
    Navigation.createExercise();
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{'Profile'}</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.menuContainer}>
          <View style={styles.menuRow}>
            <Text style={styles.rowText}>{'Body mass index (BMI): ' + this.props.details.bmi}</Text>
          </View>
          <View style={styles.splitter} />
          <View style={styles.menuRow}>
            <Text style={styles.rowText}>{'Recommended calories intake per day: ' + this.props.details.calories}</Text>
          </View>
          <View style={styles.splitter} />
          <View style={styles.menuRow}>
            <Text style={styles.rowText}>{'Ideal weight: ' + this.props.details.idealWeight}</Text>
          </View>
          <View style={styles.splitter} />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={this.regenerateWorkout}>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'red', padding: 10 }}>{'Regenerate workout'}</Text>
            </TouchableOpacity>
          </View>
          {
            this.props.details.type && this.props.details.type === 'admin' ?
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={this.createExercise}>
                  <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'green', padding: 10 }}>{'Create exercise'}</Text>
                </TouchableOpacity>
              </View> : null
          }
        </ScrollView>
        <View style={{ position: 'relative', left: 0, right: 0, bottom: 0 }}>
          <TouchableOpacity style={styles.logout} onPress={this.logout}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'red', padding: 10 }}>{'LOGOUT'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const actionsToProps = {
  regenerateWorkout
};

const mapStateToProps = state => ({
  details: state.auth.details
});

export default connect(mapStateToProps, actionsToProps)(Profile);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  splitter: {
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)',
    marginLeft: 10,
    marginRight: 10
  },
  header: {
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    minHeight: 50
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  headerTextContainer: {
    flex: 1
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingTop: 0
  },
  menuRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    padding: 20
  },
  logout: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.1)',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  button: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10
  }
});
