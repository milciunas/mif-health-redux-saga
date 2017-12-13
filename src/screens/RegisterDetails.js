import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { Actions as Navigation } from 'react-native-router-flux';

const Form = t.form.Form;

const Gender = t.enums({
  0: 'Male',
  1: 'Female'
});

const level = t.enums({
  0: 'Beginner',
  1: 'Intermediate',
  2: 'Advanced'
});

const goal = t.enums({
  0: 'Weight loss',
  1: 'Weight gain'
}, 'Goal');

const User = t.struct({
  weight: t.Number,
  height: t.Number,
  gender: Gender,
  level: level,
  goal: goal
});

const options = {
  fields: {
    level: {
      label: 'Training level'
    },
    goal: {
      label: 'Training goal'
    }
  }
};

const value = {
  gender: 0,
  level: 0,
  goal: 0
};

class RegisterDetailsScreen extends Component {
  selectDays = () => {
    //TODO: STORE USER DETAILS

    // NAVIGATE TO DAYS SELECTION
    Navigation.registerDays();
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select workout days</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <Form
            type={User}
            value={value}
            options={options}/>
          <TouchableOpacity
            style={styles.button}
            onPress={this.selectDays}
            underlayColor='#fff'>
            <Text style={styles.text}>{'Next'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, null)(RegisterDetailsScreen);

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
