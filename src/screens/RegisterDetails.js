import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { validate } from 'tcomb-validation';
import { createUserDetails } from '../state/actions/authActions';
import AutoScroll from '../components/AutoScroll';
import Header from '../components/Header';

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

const User = t.struct({
  weight: t.Number,
  height: t.Number,
  age: t.Number,
  gender: Gender,
  level: level,
  goal: goal,
  activity: activity
});

const options = {
  fields: {
    activity: {
      label: 'Activity level',
      nullOption: false
    },
    gender: {
      label: 'Gender',
      nullOption: false
    },
    level: {
      label: 'Training level',
      nullOption: false
    },
    goal: {
      label: 'Training goal',
      nullOption: false
    },
    weight: {
      keyboardType: 'numeric',
      placeholder: '40 - 150 (kg)'
    },
    height: {
      keyboardType: 'numeric',
      placeholder: '100 - 230 (cm)'
    },
    age: {
      keyboardType: 'numeric',
      placeholder: '10 - 120 (years)'
    }
  }
};

class RegisterDetailsScreen extends Component {
  static propTypes = {
    createUserDetails: PropTypes.func.isRequired,
    details: PropTypes.object,
    registerLoading: PropTypes.bool
  }

  constructor(props) {
    super(props);
    console.log('props in state', props);

    if (props.details) {
      this.state = {
        form: {
          age: props.details.age,
          weight: props.details.weight,
          height: props.details.height,
          gender: props.details.gender,
          level: props.details.level,
          goal: props.details.goal,
          activity: props.details.activity
        },
        error: null
      };
    } else {
      this.state = {
        form: {
          age: '',
          weight: '',
          height: '',
          gender: 'male',
          level: 'beginner',
          goal: 'loss',
          activity: 'no'
        },
        error: null
      };
    }
  }

  validation = (type, getValidationErrorMessage, name) => {
    const subtype = t.refinement(type, (x) => {
      return !t.String.is(getValidationErrorMessage(x));
    }, name);

    subtype.getValidationErrorMessage = getValidationErrorMessage;
    return subtype;
  }

  formValidation = (form) => {
    const age = Number(form.age);
    const weight = Number(form.weight);
    const height = Number(form.height);

    const validAge = this.validation(t.Number, (n) => {
      if (n < 10 || n > 120) {
        return 'Age is invalid';
      }
    });

    const validHeight = this.validation(t.Number, (n) => {
      if (n < 100 || n > 230) {
        return 'Height is invalid';
      }
    });

    const validWeight = this.validation(t.Number, (n) => {
      if (n < 40 || n > 150) {
        return 'Weight is invalid';
      }
    });


    if (validate(age, validAge).errors.length > 0) {
      return validate(age, validAge).firstError().message;
    }

    if (validate(height, validHeight).errors.length > 0) {
      return validate(height, validHeight).firstError().message;
    }

    if (validate(weight, validWeight).errors.length > 0) {
      return validate(weight, validWeight).firstError().message;
    }

    return false;
  }

  signUpEmailDetails = () => {
    if (this.state.form) {
      const validationResult = this.formValidation(this.state.form);
      if (validationResult) {
        this.setState({ error: validationResult });
      } else {
        this.setState({ error: null });
        this.props.createUserDetails(this.state.form);
      }
    }
  }

  onChange = (form) => {
    this.setState({ form });
  }

  render() {
    if (this.props.registerLoading) {
      return <ActivityIndicator
        animating={true}
        size='large'
        style={styles.loadingIncidator}
        color='#2196F3' />;
    } else {
      return (
        <View style={styles.screen}>
          <Header title={'Enter your details'}/>
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
              onPress={this.signUpEmailDetails}
              underlayColor='#fff'>
              <Text style={styles.text}>{'Next'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const actionsToProps = {
  createUserDetails
};

const mapStateToProps = state => ({
  registerLoading: state.auth.registerLoading
});

export default connect(mapStateToProps, actionsToProps)(RegisterDetailsScreen);

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
  },
  loadingIncidator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
