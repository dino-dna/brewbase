import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';

import colors from './src/styles/colors';
import configureStore from './src/store/configureStore';
import Dashboard from './src/containers/Dashboard';
import LoginForm from './src/containers/LoginForm';
import SignupForm from './src/containers/SignupForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lighterGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Provider store={store}>
          <View style={styles.container}>
            <Route exact path="/" component={LoginForm} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={SignupForm} />
          </View>
        </Provider>
      </NativeRouter>
    );
  }
}
