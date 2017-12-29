import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { Actions as Navigation } from 'react-native-router-flux';
import FlexImage from 'react-native-flex-image';
import { Ionicons, Entypo } from '@expo/vector-icons';
import * as firebase from 'firebase';

class Profile extends Component {
  logout = () => {
    firebase.auth().signOut();
    Navigation.welcome();
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{'Profile'}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <View style={{ flex: 2 }}>
              <Entypo name={'edit'} size={32} color='#2196F3'/>
              <Text style={{ textAlign: 'center' }}>{'EDIT PERSONAL INFORMATION'}</Text>
            </View>
          </View>
          <View style={styles.splitter} />
          <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
            <TouchableOpacity style={styles.logout} onPress={this.logout}>
              <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: 'red', padding: 10 }}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  splitter: {
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)'
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
    flex: 1
  },
  menuRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  }
});
