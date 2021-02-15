import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ReviewPage from '../pages/ReviewPage';
import ShopPage from '../pages/ShopPage';
import ReviewPageLikes from '../pages/ReviewPageLikes';

const Stack = createStackNavigator();

class StackNavigatorShop extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Stack.Navigator>
				<Stack.Screen name='ReviewPage' component={ReviewPage} />
				<Stack.Screen name='ShopPage' component={ShopPage} />
				<Stack.Screen name='ReviewPageLikes' component={ReviewPageLikes} />
			</Stack.Navigator>
		);
	}
}

export default StackNavigatorShop;
