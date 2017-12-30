import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { createExercise } from '../state/actions/authActions';
import AutoScroll from '../components/AutoScroll';

const Form = t.form.Form;

const Gender = t.enums({
  male: 'Male',
  female: 'Female'
});

const level = t.enums({
  beginner: 'Beginner',
  intermediate: 'Intermediate'
}, 'Level');

const goal = t.enums({
  loss: 'Weight loss',
  gain: 'Weight gain'
}, 'Goal');

const activity = t.enums({
  no: 'Little to no exercise',
  light: 'Light exercise (1–3 days per week)',
  moderate: 'Moderate exercise (3–5 days per week)',
  heavy: 'Heavy exercise (6–7 days per week)'
});

const levels = t.enums({
  beginner: 'Beginner',
  intermediate: 'Intermediate'
});

const muscles = t.enums({
  chest: 'Chest',
  abs: 'Abdominals',
  traps: 'Traps',
  middle_back: 'Middle back',
  lats: 'Lats',
  lower_back: 'Lower back',
  biceps: 'Biceps',
  forearms: 'Forearms',
  triceps: 'Triceps',
  shoulders: 'Shoulders',
  quads: 'Quadriceps',
  hamstrings: 'Hamstrings',
  glutes: 'Glutes',
  calves: 'Calves',
  Quads: 'Cardio'
});

const types = t.enums({
  Strength: 'Strenght',
  Cardio: 'Cardio'
});

const User = t.struct({
  name: t.String,
  image_start: t.String,
  image_end: t.String,
  type: types,
  level: levels,
  muscle: muscles
});

const options = {
  fields: {
    name: {
      label: 'Exercise title',
      placeholder: 'Crunches',
      autoFocus: true,
      autoCorrect: false
    },
    image_start: {
      label: 'Starting position image',
      placeholder: 'Use https link!',
      autoCapitalize: 'none',
      autoCorrect: false
    },
    image_end: {
      label: 'Finishing position image',
      placeholder: 'Use https link!',
      autoCorrect: false
    },
    type: {
      label: 'Exercise type',
      nullOption: false
    },
    level: {
      label: 'Exercise level',
      nullOption: false
    },
    muscle: {
      label: 'Muscle that will be trained',
      nullOption: false
    }
  },
  autoCapitalize: 'none',
  autoCorrect: false,
  autoFocus: true
};

class CreateExercise extends Component {
  static propTypes = {
    createExercise: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        level: 'beginner',
        type: 'Strength',
        muscle: 'chest',
        name: null,
        image_start: null,
        image_end: null
      },
      error: null
    };
  }

  onChange = (form) => {
    this.setState({ form });
  }

  createExercise = () => {
    this.props.createExercise(this.state.form);
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{'Create an exercise'}</Text>
          </View>
        </View>
        {
          !this.state.error ? null :
            <View style={styles.error}>
              <Text style={styles.errorText}>
                {this.state.error}
              </Text>
              <View style={styles.splitter} />
            </View>
        }
        <AutoScroll contentContainerStyle={styles.container} keyboardShouldPersistTaps={'never'}>
          <Form
            type={User}
            options={options}
            value={this.state.form}
            onChange={this.onChange} />
        </AutoScroll>
        <View style={styles.nextBtn}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.createExercise}
            underlayColor='#fff'>
            <Text style={styles.text}>{'Next'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const actionsToProps = {
  createExercise
};

export default connect(null, actionsToProps)(CreateExercise);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 20
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
  button: {
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor:'#2196F3',
    borderRadius:5
  },
  text:{
    color:'#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontSize: 20
  },
  nextBtn: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0
  },
  error: {
    justifyContent: 'center'
  },
  errorText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'red'
  },
  splitter: {
    borderBottomWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)'
  }
});
