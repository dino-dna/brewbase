import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    color: 'black',
    fontFamily: 'Menlo',
    height: 60,
    padding: 20,
    width: '100%',
  },
});

const defaults = {
  autoCapitalize: 'none',
  placeholderTextColor: colors.gray,
};

export default function FormInput(props) {
  const style = props.style ?
    StyleSheet.flatten(styles.input, props.style) :
    styles.input;

  return <TextInput {...Object.assign(defaults, props, { style })} />;
}

FormInput.defaultProps = {
  style: 0,
};

FormInput.displayName = 'FormInput';

FormInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
  ]),
  value: PropTypes.string.isRequired,
};

