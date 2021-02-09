import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import SignupPage from '../pages/SignupPage';

const Stack = createStackNavigator();

class StackNavigatorAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="AccountPage" component={SignupPage} />
            </Stack.Navigator>
        );
    }
}

export default StackNavigatorAccount;