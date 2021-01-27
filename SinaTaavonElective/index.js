/**
 * @format
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';


  export default class Main extends Component {
    render() {
    return (
        <PaperProvider>
          <App />
        </PaperProvider>
      );
  }
}

AppRegistry.registerComponent(appName, () => Main);
