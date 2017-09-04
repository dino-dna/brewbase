import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {
  changeLogin,
  changePassword,
  submit,
} from '../actions/forms';
import colors from '../styles/colors';
import Button from '../components/Button';
import Message from '../components/Message';
import FormTitle from '../components/FormTitle';
import NavLink from '../components/NavLink';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.lighterGray,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  link: {
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
  passwordInput: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Menlo',
    height: 60,
    marginBottom: 30,
    padding: 20,
    width: '100%',
  },
});

class LoginForm extends Component {
  renderMessage() { // eslint-disable-line consistent-return
    const {
      messageText,
      messageType,
    } = this.props;

    if (messageText) {
      return (
        <Message
          text={messageText}
          type={messageType}
        />
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
        <FormTitle>Log In</FormTitle>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={onLoginChange}
          placeholder="Email"
          placeholderTextColor={colors.gray}
          returnKeyType="next"
          style={styles.loginInput}
          value={loginValue}
        />
        <TextInput
          autoCapitalize="none"
          onChangeText={onPasswordChange}
          placeholder="Password"
          placeholderTextColor={colors.gray}
          returnKeyType="send"
          secureTextEntry
          style={styles.passwordInput}
          value={passwordValue}
        />
        <Button
          onPress={onSubmit}
          text="Submit"
        />
        <NavLink to="/signup" text="Sign Up" />
      </View>
    );
  }
}

LoginForm.displayName = 'LoginForm';

LoginForm.defaultProps = {
  messageText: '',
  messageType: 'success',
};

LoginForm.propTypes = {
  loginValue: PropTypes.string.isRequired,
  messageText: PropTypes.string,
  messageType: PropTypes.oneOf(Message.types),
  onLoginChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  passwordValue: PropTypes.string.isRequired,
};

const mapStateToProps = ({
  forms: {
    login: {
      login,
      messageText,
      messageType,
      password,
    },
  },
}) => ({
  loginValue: login,
  messageText,
  messageType,
  passwordValue: password,
});

export default connect(
  mapStateToProps,
  {
    onLoginChange: changeLogin,
    onPasswordChange: changePassword,
    onSubmit: submit,
  }
)(LoginForm);

