import React, { Component } from 'react'
import 'react-native-gesture-handler'
import SearchPage from '../pages/SearchPage'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

class StackNavigatorSearch extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  };

  render () {
    return (
            <Stack.Navigator>
                <Stack.Screen name="SearchPage" component={SearchPage} />
            </Stack.Navigator>
    )
  }
}

export default StackNavigatorSearch
