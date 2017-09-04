import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';

import { changeField, submit } from '../actions/forms';
import Button from '../components/Button';
import Message from '../components/Message';
import FormInput from '../components/FormInput';
import FormTitle from '../components/FormTitle';
import NavLink from '../components/NavLink';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  loginInput: {
    marginBottom: 10,
    width: '100%',
  },
  passwordInput: {
    marginBottom: 30,
    width: '100%',
  },
});

class LoginForm extends Component {
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
        <FormTitle>Log In</FormTitle>
        <View style={styles.loginInput}>
          <FormInput
            keyboardType="email-address"
            onChangeText={onEmailChange}
            placeholder="Email"
            returnKeyType="next"
            secureTextEntry={false}
            value={email}
          />
        </View>
        <View style={styles.passwordInput}>
          <FormInput
            onChangeText={onPasswordChange}
            placeholder="Password"
            returnKeyType="send"
            secureTextEntry
            value={password}
          />
        </View>
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
  message: {
    text: '',
    type: Message.types[0],
  },
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string,
    type: PropTypes.oneOf(Message.types),
  }),
  password: PropTypes.string.isRequired,
};

const mapStateToProps = ({ forms: { login } }) => login;

export default connect(
  mapStateToProps,
  {
    onEmailChange(value) {
      return changeField('login', 'email', value);
    },
    onPasswordChange(value) {
      return changeField('login', 'password', value);
    },
    onSubmit() {
      return submit('login');
    },
  }
)(LoginForm);

