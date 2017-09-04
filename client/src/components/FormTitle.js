import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  text: {
    color: colors.gray,
    fontFamily: 'AvenirNextCondensed-Bold',
    fontSize: 24,
    letterSpacing: 2,
    lineHeight: 36,
    marginBottom: 20,
  },
});

export default function FormTitle({ children }) {
  return <Text style={styles.text}>{children.toUpperCase()}</Text>;
}

FormTitle.displayName = 'FormTitle';

FormTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

