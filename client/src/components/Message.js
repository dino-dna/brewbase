import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  containerError: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    width: '100%',
  },
  containerSuccess: {
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    width: '100%',
  },
  text: {
    color: 'white',
    fontFamily: 'AvenirNextCondensed-MediumItalic',
    fontSize: 16,
    lineHeight: 20,
  },
});

export default function Message({ text, type }) {
  const style = type === 'success' ?
    styles.containerSuccess :
    styles.containerError;

  return (
    <View style={style}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

Message.displayName = 'Message';

Message.types = ['success', 'error'];

Message.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Message.types).isRequired,
};

