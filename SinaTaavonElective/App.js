import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StackNavigatorHome from './components/navigations/StackNavigatorHome';
import StackNavigatorShop from './components/navigations/StackNavigatorShop';
import StackNavigatorSearch from './components/navigations/StackNavigatorSearch';
import StackNavigatorAccount from './components/navigations/StackNavigatorAccount';

const Tab = createMaterialBottomTabNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  render() {
    return (
    <Tab.Navigator initialRouteName="Navigation" activeColor="#ffffff" barStyle={{ backgroundColor: '#1C097A' }}>
        <Tab.Screen name="Home" component={StackNavigatorHome} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />), }} />
        <Tab.Screen name="Coffee Shops" component={StackNavigatorShop} options={{ tabBarLabel: 'Coffee Shop', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="store" color={color} size={26} />), }} />
        <Tab.Screen name="Search" component={StackNavigatorSearch} options={{ tabBarLabel: 'Search', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="magnify" color={color} size={26} />), }} />
        <Tab.Screen name="Account" component={StackNavigatorAccount} options={{ tabBarLabel: 'Account', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={26} />), }} />
      </Tab.Navigator>
    );
  }
}


export default App;