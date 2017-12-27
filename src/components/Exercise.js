import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Actions as Navigation } from 'react-native-router-flux';

class ExerciseComponent extends Component {
  static propTypes = {
    image_start: PropTypes.string,
    name: PropTypes.string
  }

  componentWillReceiveProps(props) {
    this.setState(...props);
  }

  //
  //   RENDER DEFAULT VALUES IF NONE WAS PASSED
  //
  //  source={{require('./test.jpg')}} />

  openExerciseDetails = () => {
    const details = this.props;
    Navigation.exerciseDetails({ details });
  }

  render() {
    // console.log('ALL PROPS ExerciseComponent', this.props);
    return (
      <TouchableOpacity
        onPress={this.openExerciseDetails}
        style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.props.image_start }} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(ExerciseComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 200,
    marginBottom: 20,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 }
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 40
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    zIndex: -1
  }
});
