import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onPressButton = () => {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFalse);
      });
  };

  onLoginFalse = () => {
    this.setState({ error: 'Authentication Failed.', loading: false });
  };

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  };

  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return <Button onPress={this.onPressButton}>Log in</Button>;
  };

  render() {
    console.log(this.state.text);
    return (
      <Card>
        <CardSection>
          <Input
            autoCapitalize="none"
            value={this.state.email}
            label="Email"
            placeholder="user@gmail.com"
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            value={this.state.password}
            label="Password"
            placeholder="password"
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
