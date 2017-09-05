import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 5,
    paddingTop: 35,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Avenir Next',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default function DashboardHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Link to="/keg/new">
        <Text>Add Keg</Text>
      </Link>
    </View>
  );
}

DashboardHeader.displayName = 'DashboardHeader';

