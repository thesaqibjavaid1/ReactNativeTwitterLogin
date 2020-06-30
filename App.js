import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
} from 'react-native';
const {RNTwitterSignIn} = NativeModules;
const Constants = {
  TWITTER_CONSUMER_KEY: 'Xw5aTwmqB5EmgGp3h2fEK0cRq',
  TWITTER_CONSUMER_SECRET: 'dyHNunAAQwSA74Yr9a2PBthoMxXPR8M0B1inJBg8mdAPsZJ59G',
};

export default class App extends Component {
  state = {
    isLoggedIn: false,
  };

  _twitterSignIn = () => {
    RNTwitterSignIn.init(
      Constants.TWITTER_CONSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then(loginData => {
        console.log(loginData);
        const {authToken, authTokenSecret} = loginData;
        if (authToken && authTokenSecret) {
          this.setState({
            isLoggedIn: true,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleLogout = () => {
    console.log('logout');
    RNTwitterSignIn.logOut();
    this.setState({
      isLoggedIn: false,
    });
  };

  render() {
    const {isLoggedIn} = this.state;
    return (
      <View style={styles.container}>
        {isLoggedIn ? (
          <TouchableOpacity style={styles.button} onPress={this.handleLogout}>
            <Text
              style={{
                fontSize: 18,
                color: 'white',
                backgroundColor: 'grey',
                padding: 10,
              }}>
              Log out
            </Text>
          </TouchableOpacity>
        ) : (
          <Button
            name="logo-twitter"
            style={styles.button}
            onPress={this._twitterSignIn}
            title="Login with Twitter"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1b95e0',
    color: 'white',
    width: 100,
    height: 0,
  },
});
