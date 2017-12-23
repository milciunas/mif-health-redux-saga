import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { signUpEmail, registerWithEmail } from '../state/actions/authActions';

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
    email: {
      autoCorrect: false,
      autoCapitalize: 'none',
      keyboardType: 'email-address'
    },
    password: {
      password: true,
      secureTextEntry: true,
      autoCapitalize: 'none',
      autoCorrect: false
    },
    name: {
      autoCapitalize: 'none',
      autoCorrect: false
    }
  }
};

class RegisterScreen extends Component {
  static propTypes = {
    registerWithEmail: PropTypes.func.isRequired,
    error: PropTypes.string
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
      // this.props.signUpEmail(email, password);
      this.props.registerWithEmail(email, password);
    }
  }

  onChange = (form) => {
    this.setState({ form });
  }

  render() {
    this.props.error='erroras with something';
    return (
      <View style={styles.screen}>
        <Header />
        {
          !this.props.error ? null :
            <View style={styles.error}>
              <Text style={styles.errorText}>
                {this.props.error}
              </Text>
            </View>
        }
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

const mapStateToProps = state => ({
  error: state.auth.registrationError
});

const actionsToProps = {
  signUpEmail,
  registerWithEmail
};

export default connect(mapStateToProps, actionsToProps)(RegisterScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    marginTop: 20,
    padding: 20
  },
  error: {
    justifyContent: 'center'
  },
  errorText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'red'
  }
});
