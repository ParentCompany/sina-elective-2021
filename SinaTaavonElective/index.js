/**
 * @format
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

export default class Main extends Component {
  render() {
    return (
      <NavigationContainer >
        <SafeAreaProvider>
          <PaperProvider>
            <App />
          </PaperProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

AppRegistry.registerComponent(appName, () => Main);
