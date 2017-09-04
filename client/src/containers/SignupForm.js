import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { changeField, submit } from '../actions/forms';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import Message from '../components/Message';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  emailInput: {
    marginBottom: 10,
    width: '100%',
  },
  passwordInput: {
    marginBottom: 20,
    width: '100%',
  },
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
        <View style={styles.emailInput}>
          <FormInput
            keyboardType="email-address"
            onChangeText={onEmailChange}
            placeholder="Email"
            returnKeyType="next"
            value={email}
          />
        </View>
        <View style={styles.passwordInput}>
          <FormInput
            onChangeText={onPasswordChange}
            placeholder="Password"
            returnKeyType="send"
            value={password}
            secureTextEntry
          />
        </View>
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

const mapStateToProps = ({ forms: { signup } }) => signup;

export default connect(
  mapStateToProps,
  {
    onEmailChange(value) {
      return changeField('signup', 'email', value);
    },
    onPasswordChange(value) {
      return changeField('signup', 'password', value);
    },
    onSubmit() {
      return submit('signup');
    },
  }
)(SignupForm);

