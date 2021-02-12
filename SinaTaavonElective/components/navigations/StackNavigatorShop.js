import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ReviewPage from '../pages/ReviewPage';
import ShopPage from '../pages/ShopPage';


const Stack = createStackNavigator();

class StackNavigatorShop extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="ReviewPage" component={ReviewPage} />
                <Stack.Screen name="ShopPage" component={ShopPage} />
            </Stack.Navigator>
        );
    }
}

export default StackNavigatorShop;