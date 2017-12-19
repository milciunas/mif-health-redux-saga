import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Actions as Navigation } from 'react-native-router-flux';

const Form = t.form.Form;

const Days = t.struct({
  monday: t.Boolean,
  tuesday: t.Boolean,
  wednesday: t.Boolean,
  thursday: t.Boolean,
  friday: t.Boolean,
  saturday: t.Boolean,
  sunday: t.Boolean
});

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
  stylesheet: stylesheet,
  autoCapitalize: 'none',
  autoCorrect: false
};

class RegisterDaysScreen extends Component {
  navigatHome = () => {
    // TODO: call saga, save days and navigate home
    Navigation.home();
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Select workout days</Text>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.form}>
            <Form type={Days} options={options} />
            <TouchableOpacity
              style={styles.button}
              onPress={this.navigatHome}
              underlayColor='#fff'>
              <Text style={styles.text}>{'Next'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, null)(RegisterDaysScreen);

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
