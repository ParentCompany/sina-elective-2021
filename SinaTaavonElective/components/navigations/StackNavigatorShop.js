import React, { Component } from 'react';
import 'react-native-gesture-handler';
import CoffeeShopsPage from '../pages/CoffeeShopsPage';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

class StackNavigatorShop extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="ShopPage" component={CoffeeShopsPage} />
            </Stack.Navigator>
        );
    }
}

export default StackNavigatorShop;