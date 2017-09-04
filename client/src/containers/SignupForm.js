import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { changeEmail, changePassword, submit } from '../actions/forms';
import Button from '../components/Button';
import colors from '../styles/colors';
import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import Message from '../components/Message';

const styles = StyleSheet.create({
  container: {},
  emailInput: {
    backgroundColor: 'white',
    color: 'black',
  },
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
        <FormTitle>Sign Up</FormTitle>
        <FormInput
          keyboardType="email-address"
          onChangeText={onEmailChange}
          placeholder="Email"
          returnKeyType="next"
          value={email}
        />
        <FormInput
          onChangeText={onPasswordChange}
          placeholder="Password"
          returnKeyType="send"
          value={password}
          secureTextEntry
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

export default connect(
  mapStateToProps,
  {
    onEmailChange: changeEmail,
    onPasswordChange: changePassword,
    onSubmit: submit,
  }
)(SignupForm);

