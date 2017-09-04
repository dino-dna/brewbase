import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-native';

import colors from './src/styles/colors';
import configureStore from './src/store/configureStore';
import history from './src/store/history';
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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <View style={styles.container}>
            <Route exact path="/" component={LoginForm} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={SignupForm} />
          </View>
        </ConnectedRouter>
      </Provider>
    );
  }
}
