import React, { Component } from 'react';
import {
	Alert,
	View,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	Button,
	Card,
	Title,
	Paragraph,
	Avatar,
} from 'react-native-paper';

class ReviewPageLikes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopData: {},
			favourite: false,
			userData: {},
			refreshing: false,
		};
	}

	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve);
		});
	}

	statusCodeHandler = (response) => {
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
				Alert.alert(`Please go to account page to login ${response.status}`);
				break;
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


	addLike = async () => {
		const { navigation } = this.props;
		const { route } = this.props;
		const { shopId, reviewId } = route.params;

		const token = await AsyncStorage.getItem('session_token');

		return fetch(`${global.BASE_URL}/location/${shopId}/review/${reviewId}/like`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					navigation.goBack();
				} else {
					Alert.alert(`There has been an unknown error from the server.`);
				}
			})
			.catch((error) => {
				console.log(error + 'Account page error');
				Alert.alert(`There has been an unknown error from the server.`);
			});
	};

	removeLike = async () => {
		const { navigation } = this.props;
		const { route } = this.props;
		const { shopId, reviewId } = route.params;

		const token = await AsyncStorage.getItem('session_token');

		return fetch(`${global.BASE_URL}/location/${shopId}/review/${reviewId}/like`, {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					navigation.goBack();
				} else {
					Alert.alert(`There has been an unknown error from the server.`);
				}
			})
			.catch((error) => {
				console.log(error + 'Account page error');
				Alert.alert(`There has been an unknown error from the server.`);
			});

	};
	

	_onRefresh = () => {
		this.setState({ refreshing: true });
		this.componentDidMount().then(() => {
			this.setState({ refreshing: false });
		});
	};

	render() {
		const { navigation } = this.props;
		const { shopData, favourite } = this.state;
		const { route } = this.props;
		const { reviewId, reviewBody, reviewLikes } = route.params;

		return (
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					<Card style={styles.ratingSpace}>
						<Card.Content>
							<Title style={styles.ratingSpace}>Review ID: {reviewId}</Title>
							<View style={styles.reviewRow}>
								<Avatar.Icon style={styles.avatarIcon} size={24} icon='face' />
								<Paragraph style={{ flex: 1, flexWrap: 'wrap' }}>
									{reviewBody}
								</Paragraph>
								<Button
									icon='thumb-up'
									compact={true}
									disabled={true}
									mode='text'>
									{reviewLikes}
								</Button>
							</View>
							<View style={styles.reviewRowLikes}>
								<Button
									icon='thumb-up'
									compact={true}
									mode='contained'
									onPress={() => this.addLike()}></Button>
								<Button
									icon='thumb-down'
									compact={true}
									mode='contained'
									onPress={() => this.removeLike()}></Button>
							</View>
						</Card.Content>
					</Card>
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
		marginHorizontal: 10,
		marginBottom: 15,
	},
	ratingSpace: {
		marginVertical: 10,
	},
	titleRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	reviewRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: 10,
		alignItems: 'center',
	},
	avatarIcon: {
		marginRight: 15,
	},
	reviewRowLikes: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		alignItems: 'center',
	},
});

export default ReviewPageLikes;