import React, { Component } from 'react';
import {
	Alert,
	View,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

class ReviewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopData: [],
			refreshing: false,
		};
	}

	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve);
		});
	}

	_onRefresh = () => {
		this.setState({ refreshing: true });
		this.componentDidMount().then(() => {
			this.setState({ refreshing: false });
		});
	};

	statusCodeHandler = (response) => {
		const { navigation } = this.props;
		switch (response.status) {
			case 200:
				return response.json();
			case 201:
				return response.json();
			case 400:
				Alert.alert(
					`There has been an error in retreving your request. Status code: ${response.status}`
				);
				break;
			case 401:
				return navigation.navigate('LoginPage');
			case 403:
				Alert.alert(
					`Please relaunch the application. Status code: ${response.status}`
				);
				break;
			case 404:
				Alert.alert(
					`Request has not been found. Status code: ${response.status}`
				);
				break;
			case 500:
				Alert.alert(
					`Please relaunch the application or make sure you are connected to the internet. Status code: ${response.status}`
				);
				break;
			default:
				console.log(
					`There has been an unknown error. Status code: ${response.status}.`
				);
		}
	};

	componentDidMount = async () => {
		const { navigation } = this.props;
		const token = await AsyncStorage.getItem('session_token');

		if (token === null || token === undefined || token === '' || token === []) {
			navigation.push('SignupPage');
		} else if (
			token !== null ||
			token !== undefined ||
			token !== '' ||
			token !== []
		) {
			this.getData(token);
		} else {
			console.log('Need to sign in');
			AsyncStorage.clear();
			navigation.push('LoginPage');
		}
	};

	getData = async (token) => {
		return fetch(`${global.BASE_URL}/find`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
		})
			.then((response) => this.statusCodeHandler(response))
			.then(async (responseJson) => {
				await this.setStateAsync({ shopData: responseJson });
				this.setState({ isNotLoading: true });
			})
			.catch((error) => {
				console.log(error + 'Account page error');
				Alert.alert(`There has been an unknown error from the server.`);
			});
	};

	render() {
		const { navigation } = this.props;
		const { shopData } = this.state || {};
		console.log(shopData);

		const coverPhoto = [
			{
				path: 'https://cdn.ciptex.com/sina_appdev/coffee-shop-1.jpg',
			},
			{
				path: 'https://cdn.ciptex.com/sina_appdev/coffee-shop-2.jpg',
			},
			{
				path: 'https://cdn.ciptex.com/sina_appdev/coffee-shop-3.jpg',
			},
			{
				path: 'https://cdn.ciptex.com/sina_appdev/coffee-shop-4.jpg',
			},
			{
				path: 'https://cdn.ciptex.com/sina_appdev/coffee-shop-5.jpg',
			},
		];

		return (
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					{shopData?.map((shop, index) => (
						<Card key={index} style={styles.spaceCard}>
							<Card.Title
								title={shop.location_name}
								subtitle={shop.location_town}
							/>
							<Card.Cover source={{ uri: coverPhoto[index].path }} />
							<Card.Actions>
								<Button
									mode='text'
									compact={true}
									onPress={() =>
										navigation.navigate('ShopPage', {
											shopId: shop.location_id,
											coverPhoto: coverPhoto[index].path,
										})
									}>
									Go to the Coffee Shop
								</Button>
							</Card.Actions>
						</Card>
					))}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	titlePage: {
		marginHorizontal: 10,
		marginVertical: 20,
	},
	rowContainer: {
		flexDirection: 'row',
	},
	spaceCard: {
		marginVertical: 15,
		marginHorizontal: 10,
	},
	rowCard: {
		flex: 1,
		marginHorizontal: 10,
		justifyContent: 'space-between',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
});

export default ReviewPage;
