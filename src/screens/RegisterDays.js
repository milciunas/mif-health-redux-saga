import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { createWorkoutDays } from '../state/actions/authActions';

const Form = t.form.Form;

const Days = t.struct({
  monday: t.Boolean,
  tuesday: t.Boolean,
  wednesday: t.Boolean,
  thursday: t.Boolean,
  friday: t.Boolean,
  saturday: t.Boolean,
  sunday: t.Boolean
}, 'Days');

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.formGroup = {
  normal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
  error: {
    flex: 1,
    flexDirection: 'row'
  }
};

stylesheet.controlLabel = {
  normal: {
    paddingRight: 180,
    margin: 10,
    fontSize: 20,
    fontWeight: '600'
  }
};

stylesheet.checkbox = {
  normal: {
    margin: 2
  }
};

const options = {
  stylesheet: stylesheet
};

class RegisterDaysScreen extends Component {
  static propTypes = {
    createWorkoutDays: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }
    };
  }

  onChange = (form) => {
    this.setState({ form });
  }

  createWorkoutDays = () => {
    let selectedDays = 0;
    for (const key in this.state.form) {
      if (this.state.form.hasOwnProperty(key)) {
        if (this.state.form[key]) {
          selectedDays++;
        }
      }
    }

    if (selectedDays >= 1) {
      this.props.createWorkoutDays(selectedDays);
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select workout days</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.form}>
            <Form
              type={Days}
              options={options}
              value={this.state.form}
              onChange={this.onChange} />
            <TouchableOpacity
              style={styles.button}
              onPress={this.createWorkoutDays}
              underlayColor='#fff'>
              <Text style={styles.text}>{'Next'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const actionsToProps = {
  createWorkoutDays
};

export default connect(null, actionsToProps)(RegisterDaysScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20
  },
  form: {
    paddingTop: 30
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
