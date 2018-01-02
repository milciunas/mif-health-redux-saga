import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';
import { registerWithEmail } from '../state/actions/authActions';
import { Actions as Navigation } from 'react-native-router-flux';

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
      },
      error: null
    };
  }

  signUp = () => {
    const { email, password } = this.state.form;
    if (email && password && email.length > 0 && password.length > 0) {
      this.setState({ error: null });
      this.props.registerWithEmail(email, password);
    } else {
      this.setState({ error: 'Please enter your details!' });
    }
  }

  onChange = (form) => {
    this.setState({ form });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Header title={'Register'} />
        {
          this.state.error ?
            <View style={styles.error}>
              <Text style={styles.errorText}>
                {this.state.error}
              </Text>
            </View> :
            this.props.error ?
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {this.props.error}
                </Text>
              </View> : null
        }
        <View style={styles.container}>
          <Form
            type={User}
            options={options}
            value={this.state.form}
            onChange={this.onChange} />
          <TouchableOpacity
            style={styles.button}
            onPress={this.signUp}
            underlayColor='#fff'>
            <Text style={styles.btnText}>{'Continue'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.registrationError
});

const actionsToProps = {
  registerWithEmail
};

export default connect(mapStateToProps, actionsToProps)(RegisterScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flex: 1,
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
  },
  button: {
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#2196F3',
    borderRadius:4
  },
  btnText:{
    color:'#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontSize: 20
  }
});
