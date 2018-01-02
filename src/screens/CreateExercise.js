import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { createExercise } from '../state/actions/authActions';
import AutoScroll from '../components/AutoScroll';
import { validate } from 'tcomb-validation';
import Header from '../components/Header';

const Form = t.form.Form;

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
      autoCapitalize: 'none',
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

  validation = (type, getValidationErrorMessage, name) => {
    const subtype = t.refinement(type, (x) => {
      return !t.String.is(getValidationErrorMessage(x));
    }, name);

    subtype.getValidationErrorMessage = getValidationErrorMessage;
    return subtype;
  }

  formValidation = (form) => {
    const name = form.name;
    const image_start = form.image_start;
    const image_end = form.image_end;

    if (!name) {
      return 'Please enter exercise title!';
    }
    if (!image_start) {
      return 'Please enter starting image link!';
    }
    if (!image_end) {
      return 'Please enter finishing image link!';
    }


    const validName = this.validation(t.String, (s) => {
      if (s.length > 30) {
        return 'Exercise title should be shorter than 30 symbols!';
      } else if (s.length < 5) {
        return 'Exercise title should be longer than 4 symbols!';
      }
    });

    if (validate(name, validName).errors.length > 0) {
      return validate(name, validName).firstError().message;
    }

    const validStartingImage = this.validation(t.String, (s) => {
      if (!s.includes('https')) {
        return 'Starting image should have https link!';
      } else if (s.length < 10) {
        return 'Starting image link is too short!';
      }
    });

    if (validate(image_start, validStartingImage).errors.length > 0) {
      return validate(image_start, validStartingImage).firstError().message;
    }

    const validFinishingImage = this.validation(t.String, (s) => {
      if (!s.includes('https')) {
        return 'Finishing image should have https link!';
      } else if (s.length < 10) {
        return 'Finishing image link is too short!';
      }
    });

    if (validate(image_end, validFinishingImage).errors.length > 0) {
      return validate(image_end, validFinishingImage).firstError().message;
    }

    return false;
  }

  onChange = (form) => {
    this.setState({ form });
  }

  createExercise = () => {
    if (this.state.form) {
      const validationResult = this.formValidation(this.state.form);
      if (validationResult) {
        this.setState({ error: validationResult });
      } else {
        this.setState({ error: null });
        this.props.createExercise(this.state.form);
      }
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header title={'Create an exercise'} />
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
