/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { store } from './app/redux/store';
import { Provider } from 'react-redux';
import { MainBottomTabNavigator } from './app/navigations/mainBottomTabNavigator/mainBottomTabNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        {MainBottomTabNavigator()}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
