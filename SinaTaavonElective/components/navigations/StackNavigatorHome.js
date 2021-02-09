import React, { Component } from 'react';
import 'react-native-gesture-handler';
import HomePage from '../pages/HomePage';
import { createStackNavigator } from '@react-navigation/stack';
import CoffeeShopsPage from '../pages/CoffeeShopsPage';

const Stack = createStackNavigator();

class StackNavigatorHome extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };


    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="Coffee"  component={CoffeeShopsPage} />
            </Stack.Navigator>
        );
    }
}

export default StackNavigatorHome;