import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loginWithEmail, loginAnonymously } from '../state/actions/authActions';
import t from 'tcomb-form-native';
import { Actions as Navigation } from 'react-native-router-flux';
import * as firebase from 'firebase';
const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return reg.test(email);
});

const User = t.struct({
  email: Email,
  password: t.String
});

const options = {
  auto: 'placeholders',
  fields: {
    email: {
      autoCapitalize: 'none',
      autoCorrect: false,
      keyboardType: 'email-address'
    },
    password: {
      password: true,
      secureTextEntry: true,
      autoCapitalize: 'none',
      autoCorrect: false
    }
  }
};

class WelcomeScreen extends Component {
  static propTypes = {
    loginWithEmail: PropTypes.func.isRequired,
    loginAnonymously: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loginError: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        email: '',
        password: ''
      }
    };
  }

  navigateToRegister = () => {
    Navigation.register();
  }

  navigateToTry = () => {
    this.props.loginAnonymously();
  }

  login = () => {
    const { email, password } = this.state.form;
    if (email && password && email.length > 0 && password.length > 0) {
      this.props.loginWithEmail(email, password, 'login');
    }
  }

  onChange = (form) => {
    this.setState({ form });
  }

  render() {
    if (this.props.loading) {
      return <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        size='large'
        color='#2196F3' />;
    }

    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{'MIF HEALTH'}</Text>
          </View>
          {
            !this.props.loginError ? null :
              <View style={styles.error}>
                <Text style={styles.errorText}>
                  {this.props.loginError}
                </Text>
              </View>
          }
          <View style={styles.formContainer}>
            <Form
              type={User}
              options={options}
              value={this.state.form}
              onChange={this.onChange} />
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={this.login}
                underlayColor='#fff'>
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={this.navigateToRegister}
                underlayColor='#fff'>
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.tryOutButton}
              onPress={this.navigateToTry}
              underlayColor='#fff'>
              <Text style={styles.btnText}>Try out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  loginError: state.auth.loginError
});

const actionsToProps = {
  loginWithEmail,
  loginAnonymously
};

export default connect(mapStateToProps, actionsToProps)(WelcomeScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    justifyContent: 'center',
    padding: 20
  },
  formContainer: {
    borderWidth: 1,
    borderColor: 'rgba(8,8,8,0.2)',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 20,
    margin: 10,
    padding: 20
  },
  btn: {
    marginBottom: 10
  },
  title: {
    justifyContent: 'center',
    padding: 20
  },
  titleText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  },
  loginScreenButton: {
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#2196F3',
    borderRadius:4
  },
  tryOutButton: {
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'orange',
    borderRadius: 4
  },
  btnText:{
    color:'#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontSize: 20
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
