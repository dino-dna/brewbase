import React from 'react';
import { StyleSheet, View } from 'react-native';

import LoginForm from './src/components/LoginForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: '',
      passwordValue: '',
      message: null,
      messageType: null,
    };

    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onLoginChange(value) {
    this.setState(Object.assign({}, this.state, {
      loginValue: value,
    }));
  }

  onPasswordChange(value) {
    this.setState(Object.assign({}, this.state, {
      passwordValue: value,
    }));
  }

  onSubmit() {
    this.setState(Object.assign({}, this.state, {
      message: 'Success!',
      type: 'success',
    }));
  }

  render() {
    const {
      loginValue,
      message,
      messageType,
      passwordValue,
    } = this.state;

    return (
      <View style={styles.container}>
        <LoginForm
          loginValue={loginValue}
          message={message}
          messageType={messageType}
          onLoginChange={this.onLoginChange}
          onPasswordChange={this.onPasswordChange}
          onSubmit={this.onSubmit}
          passwordValue={passwordValue}
        />
      </View>
    );
  }
}
