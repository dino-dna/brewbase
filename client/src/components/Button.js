import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  background: {
    alignItems: 'center',
    backgroundColor: colors.orange,
    width: '100%',
  },
  text: {
    color: 'white',
    fontFamily: 'Avenir Next',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
    padding: 20,
  },
});

export default function Button({ onPress, text }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <View style={styles.background}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

Button.displayName = 'Button';

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

