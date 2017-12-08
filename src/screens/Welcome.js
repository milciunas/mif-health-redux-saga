import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchTest } from '../state/actions/testActions';
import { loginEmail } from '../state/actions/authActions';
import t from 'tcomb-form-native';

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
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};

class WelcomeScreen extends Component {
  static propTypes = {
    fetchTest: PropTypes.func.isRequired,
    loginEmail: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
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

  componentDidMount() {
    this.props.fetchTest();
  }

  navigateToRegister = () => {
    this.props.navigation.navigate('Register');
  }

  login = () => {
    const { email, password } = this.state.form;
    if (email && password && email.length > 0 && password.length > 0) {
      this.props.loginEmail(email, password);
    }
  }

  onChange = (form) => {
    this.setState({ form });
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>MIF HEALTH</Text>
          </View>
          <Form 
            type={User} 
            options={options}
            value={this.state.form}
            onChange={this.onChange} />
          <View style={styles.loginBtn}>
            <Button
              title={'Login'}
              onPress={this.login}
              style={styles.btnColor}
            />
          </View>
          <Button
            title={'Register'}
            onPress={this.navigateToRegister}
            style={styles.btnColor}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  exercises: state.test.exercises.toJS()
});

const actionsToProps = {
  fetchTest,
  loginEmail
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
  loginBtn: {
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
  btnColor: {
    backgroundColor: '#2196F3'
  }
});
