import React, { Component } from 'react'
import 'react-native-gesture-handler'
import HomePage from '../pages/HomePage'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

class StackNavigatorHome extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name='HomePage' component={HomePage} />
            </Stack.Navigator>
        )
    }
}

export default StackNavigatorHome
