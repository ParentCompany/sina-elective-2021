import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import 'react-native-gesture-handler';
import LoginHandle from './components/LoginHandle';
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
        <Tab.Screen name="Home" component={LoginHandle} options={{ tabBarLabel: 'Home',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="home" color={color} size={26} />),}} />
        <Tab.Screen name="Coffee Shops" component={LoginHandle} options={{ tabBarLabel: 'Coffee Shop',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="store" color={color} size={26} />),}} />
        <Tab.Screen name="Search" component={LoginHandle} options={{ tabBarLabel: 'Search',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="magnify" color={color} size={26} />),}} />
        <Tab.Screen name="Account" component={LoginHandle} options={{ tabBarLabel: 'Account',tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="account" color={color} size={26} />),}} />
      </Tab.Navigator>
    );
  }
}


export default App;