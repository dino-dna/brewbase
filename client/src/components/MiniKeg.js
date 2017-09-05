import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import colors from '../styles/colors';

const styles = StyleSheet.create({
  capacity: {
    color: colors.gray,
    fontFamily: 'Avenir Next',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  capacityLabel: {
    color: colors.gray,
    fontFamily: 'Avenir Next',
    fontSize: 20,
    lineHeight: 24,
    paddingLeft: 2,
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  containerInner: {
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  delimiter: {
    color: colors.gray,
    fontFamily: 'Avenir Next',
    fontSize: 20,
    lineHeight: 24,
    paddingLeft: 4,
    paddingRight: 4,
  },
  measurements: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Menlo',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  volume: {
    fontFamily: 'Menlo',
    fontSize: 18,
    lineHeight: 28,
  },
});

export default function MiniKeg({
  // beer,
  capacity,
  // gasType,
  name,
  onPress,
  // servingPressure,
  // type,
  volume,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.containerInner}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.measurements}>
          <Text style={styles.volume}>{volume}</Text>
          <Text style={styles.delimiter}>/</Text>
          <Text style={styles.capacity}>{capacity}</Text>
          <Text style={styles.capacityLabel}>gal.</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

MiniKeg.defaultProps = {
  servingPressure: null,
  type: 'korny',
};

MiniKeg.displayName = 'MiniKeg';

MiniKeg.propTypes = {
  // beer: PropTypes.shape({
  //   abv: PropTypes.number.isRequired,
  //   description: PropTypes.string,
  //   gravity: PropTypes.object.isRequired,
  //   ibu: PropTypes.number,
  //   name: PropTypes.string.isRequired,
  //   srm: PropTypes.number.isRequired,
  //   style: PropTypes.string.isRequired,
  // }).isRequired,
  capacity: PropTypes.number.isRequired,
  // gasType: PropTypes.oneOf([
  //   'argon',
  //   'gmix',
  //   'carbon-dioxide',
  //   'nitrogen',
  // ]),
  // servingPressure: PropTypes.number,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  // type: PropTypes.oneOf(['korny', 'full']),
  volume: PropTypes.number.isRequired,
};

