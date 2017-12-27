import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { Actions as Navigation } from 'react-native-router-flux';
import FlexImage from 'react-native-flex-image';

class ExerciseDetails extends Component {
  static propTypes = {
    details: PropTypes.shape({
      id: PropTypes.number,
      image_end: PropTypes.string,
      image_start: PropTypes.string,
      level: PropTypes.string,
      muscle: PropTypes.string,
      name: PropTypes.string,
      sets_x_reps: PropTypes.string,
      type: PropTypes.string
    })
  }

  render() {
    const { image_end, image_start, muscle, name, sets_x_reps } = this.props.details;

    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => Navigation.pop()}
            style={styles.headerBackContainer}>
            <Text style={styles.headerBackIndicator}>{'Back'}</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{name}</Text>
          </View>
          <TouchableOpacity
            onPress={() => Navigation.pop()}
            style={styles.headerBackContainer}>
            <Text style={styles.headerBackIndicator}>{'Weight'}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[ styles.textContainer, { marginTop: -10 } ]}>
            <Text style={{ textAlign: 'center' }}>{'Muscle to be trained: '}</Text>
            <Text style={{ fontWeight: '700' }}>{muscle}</Text>
          </View>
          <View style={styles.splitter} />
          <View style={styles.textContainer}>
            <Text style={{ textAlign: 'center' }}>{'Sets and Repetitions: '}</Text>
            <Text style={{ fontWeight: '700' }}>{sets_x_reps}</Text>
          </View>
          <View style={styles.splitter} />
          <View style={{ margin: 10 }}>
            <Text style={styles.imageText}>{'Starting position'}</Text>
            <FlexImage source={{ uri: image_start }} />
          </View>
          <View style={{ margin: 10 }}>
            <Text style={styles.imageText}>{'Finishing position'}</Text>
            <FlexImage source={{ uri: image_end }} />
          </View>

        </ScrollView>
      </View>
    );
  }
}

export default ExerciseDetails;

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
    padding: 5
  },
  headerBackContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  headerBackIndicator: {
    fontWeight: '600',
    color: '#2196F3'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center'
  },
  headerTextContainer: {
    flex: 1
  },
  scrollContainer: {
    justifyContent: 'center',
    paddingVertical: 20
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  imageText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10
  }
});
