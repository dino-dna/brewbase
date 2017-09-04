import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-native';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
  },
  text: {
    color: colors.gray,
    fontFamily: 'Avenir Next',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default function NavLink({ text, to }) {
  return (
    <Link
      style={styles.container}
      to={to}
    >
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
}

NavLink.displayName = 'Link';

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

