import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import AccountPage from '../pages/AccountPage';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

class StackNavigatorAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

 

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="AccountPage" component={AccountPage} />
                <Stack.Screen name="SignupPage" component={SignupPage} />
                <Stack.Screen name="LoginPage" component={LoginPage} />
            </Stack.Navigator>
        );
    }
}

export default StackNavigatorAccount;