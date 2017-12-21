import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { signUpEmailDetails } from '../state/actions/authActions';

const Form = t.form.Form;

const Gender = t.enums({
  male: 'Male',
  fmale: 'Female'
});

const level = t.enums({
  beginner: 'Beginner',
  intermediate: 'Intermediate'
}, 'Level');

const goal = t.enums({
  loss: 'Weight loss',
  gain: 'Weight gain'
}, 'Goal');

const User = t.struct({
  weight: t.Number,
  height: t.Number,
  age: t.Number,
  gender: Gender,
  level: level,
  goal: goal
});

const options = {
  fields: {
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
      keyboardType: 'numeric'
    },
    height: {
      keyboardType: 'numeric'
    },
    age: {
      keyboardType: 'numeric'
    }
  },
  autoCapitalize: 'none',
  autoCorrect: false
};

class RegisterDetailsScreen extends Component {
  static propTypes = {
    signUpEmailDetails: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        weight: 80,
        height: 180,
        age: 16,
        gender: 'male',
        level: 'beginner',
        goal: 'loss'
      }
    };
  }

  signUpEmailDetails = () => {
    if (this.state.form) {
      this.props.signUpEmailDetails(this.state.form);
    }
  }

  onChange = (form) => {
    this.setState({ form });
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{'Enter your details'}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <Form
            type={User}
            options={options}
            value={this.state.form}
            onChange={this.onChange} />
          <TouchableOpacity
            style={styles.button}
            onPress={this.signUpEmailDetails}
            underlayColor='#fff'>
            <Text style={styles.text}>{'Next'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const actionsToProps = {
  signUpEmailDetails
};

export default connect(null, actionsToProps)(RegisterDetailsScreen);

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
    marginRight:40,
    marginLeft:40,
    marginTop:30,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#2196F3',
    borderRadius:20
  },
  text:{
    color:'#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontSize: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  },
  titleContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    marginLeft: 20,
    marginRight: 20,
    margin: 5
  }
});
