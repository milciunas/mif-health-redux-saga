import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9
import Header from '../components/Header';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String
});

class LoginScreen extends Component {
  doStuff = () => {
    this.props.navigation.goBack('Login');
  }

  render() {
    console.log('navas', this.props.navigation);
    return (
      <View style={styles.screen}>
        <Header screenProps={this.props}/>
        <View style={styles.container}>
          <Form type={User} />
          <Button
            title={'Register'}
            style={{ borderWidth: 1 }}
            onPress={this.doStuff}
          />
        </View>
      </View>
    );
  }
}

export default LoginScreen;

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

