import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = {
    loggedIn: false
  };

  componentDidMount() {

    firebase.initializeApp({ Your_Api_Key_here! });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log out</Button>
            </CardSection>
          </View>
        );

      case false:
        return <LoginForm />;

      default:
        return <Spinner size="large" />;
    }
  };

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}
