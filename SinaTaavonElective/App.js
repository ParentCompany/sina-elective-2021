import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
import LoginHandlePage from './components/LoginHandlePage';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import CoffeeShopsPage from './components/CoffeeShopsPage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  render() {
    return (
      <Tab.Navigator initialRouteName="Navigation" activeColor="#ffffff" barStyle={{ backgroundColor: '#1C097A' }}>
        <Tab.Screen name="Home" component={HomePage} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />), }} />
        <Tab.Screen name="Coffee Shops" component={CoffeeShopsPage} options={{ tabBarLabel: 'Coffee Shop', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="store" color={color} size={26} />), }} />
        <Tab.Screen name="Search" component={SearchPage} options={{ tabBarLabel: 'Search', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="magnify" color={color} size={26} />), }} />
        <Tab.Screen name="Account" component={LoginHandlePage} options={{ tabBarLabel: 'Account', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={26} />), }} />
      </Tab.Navigator>
    );
  }
}


export default App;