import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
  },
  buttonBackground: {
    alignItems: 'center',
    backgroundColor: '#c88d36',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Avenir Next',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
    padding: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f1edea',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  loginInput: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Menlo',
    height: 60,
    marginBottom: 10,
    padding: 20,
    width: '100%',
  },
  messageContainerError: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    width: '100%',
  },
  messageContainerSuccess: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    width: '100%',
  },
  messageText: {
    color: 'white',
    fontFamily: 'AvenirNextCondensed-MediumItalic',
    fontSize: 16,
    lineHeight: 20,
  },
  passwordInput: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Menlo',
    height: 60,
    marginBottom: 30,
    padding: 20,
    width: '100%',
  },
  title: {
    color: '#98997f',
    fontFamily: 'AvenirNextCondensed-Bold',
    fontSize: 24,
    letterSpacing: 2,
    lineHeight: 36,
    marginBottom: 20,
  },
});

export default class LoginForm extends Component {
  renderMessage() { // eslint-disable-line consistent-return
    const {
      message,
      messageType,
    } = this.props;

    if (message) {
      const style = messageType === 'success' ?
        styles.messageContainerSuccess :
        styles.messageContainerError;

      return (
        <View style={style}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      );
    }
  }

  render() {
    const {
      loginValue,
      onLoginChange,
      onPasswordChange,
      onSubmit,
      passwordValue,
    } = this.props;

    return (
      <View style={styles.container}>
        {this.renderMessage()}
        <Text style={styles.title}>LOG IN</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={onLoginChange}
          placeholder="Email"
          placeholderTextColor="#98997f"
          returnKeyType="next"
          style={styles.loginInput}
          value={loginValue}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={onPasswordChange}
          placeholder="Password"
          placeholderTextColor="#98997f"
          returnKeyType="send"
          secureTextEntry
          style={styles.passwordInput}
          value={passwordValue}
        />
        <TouchableOpacity
          onPress={onSubmit}
          style={styles.buttonContainer}
        >
          <View style={styles.buttonBackground}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginForm.defaultProps = {
  message: '',
  messageType: 'success',
};

LoginForm.propTypes = {
  loginValue: PropTypes.string.isRequired,
  message: PropTypes.string,
  messageType: PropTypes.oneOf(['success', 'error']),
  onLoginChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  passwordValue: PropTypes.string.isRequired,
};

