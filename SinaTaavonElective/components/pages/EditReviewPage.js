import React, { Component } from 'react';
import {
	Alert,
	View,
	StyleSheet,
	ScrollView,
	RefreshControl,
	ToastAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
	Button,
	TextInput,
	Caption,
	Title,
	ToggleButton,
	Paragraph
} from 'react-native-paper';

import { AirbnbRating } from 'react-native-ratings';


class EditReviewPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shopData: {},
			favourite: false,
			userData: {},
			refreshing: false,
			reviewOverall: 0,
			reviewQuality: 0,
			reviewPrice: 0,
			reviewCleanliness: 0,
			reviewBody: ''
		};
	}

	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve);
		});
	}

	onChangeText = (key, value) => {
		this.setState({ [key]: value })
	}

	componentDidMount = () => {
		const { route } = this.props;
		const { reviewOverall, reviewQuality, reviewCleanliness, reviewPrice, reviewBody } = route.params;
		this.setState({reviewOverall: reviewOverall, reviewQuality: reviewQuality, reviewCleanliness: reviewCleanliness, reviewPrice: reviewPrice, reviewBody: reviewBody})

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

	editReview = async () => {
		const { navigation } = this.props;
		const { route } = this.props;
		const { reviewId, shopId } = route.params;
		const { reviewOverall, reviewQuality, reviewCleanliness, reviewPrice, reviewBody } = this.state;

		const token = await AsyncStorage.getItem('session_token');

		let payload = { overall_rating: reviewOverall, price_rating: reviewPrice, quality_rating: reviewQuality, clenliness_rating: reviewCleanliness, review_body: reviewBody }

		return fetch(`${global.BASE_URL}/location/${shopId}/review/${reviewId}`, {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
			body: JSON.stringify(payload)
		})
			.then((response) => {
				if (response.status === 200) {
					navigation.push('AccountPage');
					ToastAndroid.show("Review has been edited", ToastAndroid.SHORT);
				} else {
					Alert.alert(`There has been an unknown error from the server.`);
				}
			})
			.catch((error) => {
				console.log(error + 'Account page error');
				Alert.alert(`There has been an unknown error from the server.`);
			});
	};


	


	render() {
		const { route } = this.props;
        const { reviewOverall, reviewQuality, reviewCleanliness, reviewPrice, reviewBody } = this.state;

		return (
			<View style={styles.container}>
				<ScrollView>
					<Title style={styles.titlePage}>Write your review</Title>
					<View style={styles.rowContainer}>
						<Paragraph>Overall: </Paragraph>
						<AirbnbRating
							onFinishRating={(reviewOverall) => this.setState({ reviewOverall })}
							showRating={false}
							count={5}
							defaultRating={reviewOverall}
							size={20}
						/>
					</View>
					<View style={styles.rowContainer}>
						<Paragraph>Price: </Paragraph>
						<AirbnbRating
							onFinishRating={(reviewPrice) => this.setState({ reviewPrice })}
							showRating={false}
							count={5}
							defaultRating={reviewPrice}
							size={20}
						/>
					</View>
					<View style={styles.rowContainer}>
						<Paragraph>Quality: </Paragraph>
						<AirbnbRating
							onFinishRating={(reviewQuality) => this.setState({ reviewQuality })}
							showRating={false}
							count={5}
							defaultRating={reviewQuality}
							size={20}
						/>
					</View>
					<View style={styles.rowContainer}>
						<Paragraph>Cleanliness: </Paragraph>
						<AirbnbRating
							onFinishRating={(reviewCleanliness) => this.setState({ reviewCleanliness })}
							showRating={false}
							count={5}
							defaultRating={reviewCleanliness}
							size={20}
						/>
					</View>

					<TextInput
						style={styles.textInput}
						placeholder={reviewBody}
						autoCapitalize="none"
						multiline
						onChangeText={(reviewBody) => this.setState({reviewBody})}
					/>
					<Button style={styles.loginButton} mode="contained" onPress={() => this.editReview()}>
						Submit
  </Button>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	titlePage: {
		marginVertical: 20,
	},
	rowContainer: {
		flexDirection: 'row',
		marginVertical: 10
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
	textInput: {
		marginVertical: 10
	},
});

export default EditReviewPage;
