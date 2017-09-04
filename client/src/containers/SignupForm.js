import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import Button from '../components/Button';
import Message from '../components/Message';

const styles = StyleSheet.create({
  container: {},
  emailInput: {},
  passwordInput: {},
});

class SignupForm extends Component {
  renderMessage() { // eslint-disable-line consistent-return
    const {
      message: { text, type },
    } = this.props;

    if (text) {
      return (
        <Message
          text={text}
          type={type}
        />
      );
    }
  }

  render() {
    const {
      email,
      onEmailChange,
      onPasswordChange,
      onSubmit,
      password,
    } = this.props;

    return (
      <View style={styles.container}>
        {this.renderMessage()}
        <Text>SIGN UP</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={onEmailChange}
          placeholder="Email"
          placeholderTextColor="#98997f"
          returnKeyType="next"
          value={email}
          style={styles.emailInput}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={onPasswordChange}
          placeholder="Password"
          placeholderTextColor="#98997f"
          returnKeyType="send"
          value={password}
          secureTextEntry
          style={styles.passwordInput}
        />
        <Button
          onPress={onSubmit}
          text="SUBMIT"
        />
      </View>
    );
  }
}

SignupForm.displayName = 'SignupForm';

SignupForm.defaultProps = {
  message: {
    text: '',
    type: 'success',
  },
};

SignupForm.propTypes = {
  email: PropTypes.string.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(Message.types),
  }),
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  forms: {
    signup: {
      email,
      message,
      password,
    },
  },
}) => ({
  email,
  message,
  password,
});

export default connect(mapStateToProps)(SignupForm);

