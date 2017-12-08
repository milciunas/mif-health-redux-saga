import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';
import { signUpEmail } from '../state/actions/authActions';

import Header from '../components/Header';

const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const User = t.struct({
  email: Email,
  name: t.String,
  password: t.String
});

const options = {
  auto: 'placeholders',
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

class RegisterScreen extends Component {
  static propTypes = {
    signUpEmail: PropTypes.func.isRequired
  } 
  
  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: '',
        name: ''
      }
    };
  }

  signUp = () => {
    const { email, password } = this.state.form;
    if (email && password && email.length > 0 && password.length > 0) {
      this.props.signUpEmail(email, password);
    }
  }

  onChange = (form) => {
    this.setState({ form });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header />
        <View style={styles.container}>
          <Form 
            type={User} 
            options={options}
            value={this.state.form}
            onChange={this.onChange} />
          <Button
            title={'Register'}
            onPress={this.signUp}
          />
        </View>
      </View>
    );
  }
}

const actionsToProps = {
  signUpEmail
};

export default connect(null, actionsToProps)(RegisterScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20
  }
});

