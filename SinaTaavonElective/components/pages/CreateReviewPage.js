import React, { Component } from 'react'
import {
	Alert,
	View,
	StyleSheet,
	ScrollView,
	RefreshControl,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
	Button,
	TextInput,
	Title,
	Paragraph,
} from 'react-native-paper'

import { AirbnbRating } from 'react-native-ratings'

class CreateReviewPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			shopData: {},
			favourite: false,
			userData: {},
			refreshing: false,
			overall: 0,
			quality: 0,
			price: 0,
			cleanliness: 0,
			reviewBody: '',
		}
	}

	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve)
		})
	}

	onChangeText = (key, value) => {
		this.setState({ [key]: value })
	}

	statusCodeHandler = (response) => {
		switch (response.status) {
			case 200:
				return response.json()
			case 201:
				return response.json()
			case 400:
				Alert.alert(
					`There has been an error in retreving your request. Status code: ${response.status}`
				)
				break
			case 401:
				Alert.alert(
					`Please go to account page to login ${response.status}`
				)
				break
			case 403:
				Alert.alert(
					`Please relaunch the application. Status code: ${response.status}`
				)
				break
			case 404:
				Alert.alert(
					`Request has not been found. Status code: ${response.status}`
				)
				break
			case 500:
				Alert.alert(
					`Please relaunch the application or make sure you are connected to the internet. Status code: ${response.status}`
				)
				break
			default:
				console.log(
					`There has been an unknown error. Status code: ${response.status}.`
				)
		}
	}

	profanityFilter = () => {
		const catalogue = ['cake', 'muffin', 'biscuit', 'cakes', 'muffins', 'biscuits', 'croissant', 'croissants', 'bread']
		let hasProfanity = catalogue.some(snippit => this.state.reviewBody.toLowerCase().includes(snippit))

		if (hasProfanity) {
			Alert.alert(`You can only talk about the coffee.`)
		} else {
			this.addReview()
		}
	}

	addReview = async () => {
		const { navigation } = this.props
		const { route } = this.props
		const { shopId } = route.params
		const {
			overall,
			quality,
			cleanliness,
			price,
			reviewBody,
		} = this.state

		const token = await AsyncStorage.getItem('session_token')

		let payload = {
			overall_rating: overall,
			price_rating: price,
			quality_rating: quality,
			clenliness_rating: cleanliness,
			review_body: reviewBody,
		}

		console.log(payload)
		return fetch(`${global.BASE_URL}/location/${shopId}/review`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
			body: JSON.stringify(payload),
		})
			.then((response) => {
				if (response.status === 201) {
					navigation.goBack()
				} else {
					Alert.alert(`There has been an unknown error from the server.`)
				}
			})
			.catch((error) => {
				console.log(error + 'Account page error')
				Alert.alert(`There has been an unknown error from the server.`)
			})
	}

	removeLike = async () => {
		const { navigation } = this.props
		const { route } = this.props
		const { shopId, reviewId } = route.params

		const token = await AsyncStorage.getItem('session_token')

		return fetch(
			`${global.BASE_URL}/location/${shopId}/review/${reviewId}/like`,
			{
				method: 'delete',
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': token,
				},
			}
		)
			.then((response) => {
				if (response.status === 200) {
					navigation.goBack()
				} else {
					Alert.alert(`There has been an unknown error from the server.`)
				}
			})
			.catch((error) => {
				console.log(error + 'Account page error')
				Alert.alert(`There has been an unknown error from the server.`)
			})
	}

	render() {
		const {
			overall,
			quality,
			cleanliness,
			price,
			reviewBody,
		} = this.state

		return (
			<View style={styles.container}>
				<ScrollView>
					<Title style={styles.titlePage}>Write your review</Title>
					<View style={styles.rowContainer}>
						<Paragraph>Overall: </Paragraph>
						<AirbnbRating
							onFinishRating={(overall) => this.setState({ overall })}
							showRating={false}
							count={5}
							defaultRating={overall}
							size={20}
						/>
					</View>
					<View style={styles.rowContainer}>
						<Paragraph>Price: </Paragraph>
						<AirbnbRating
							onFinishRating={(price) => this.setState({ price })}
							showRating={false}
							count={5}
							defaultRating={price}
							size={20}
						/>
					</View>
					<View style={styles.rowContainer}>
						<Paragraph>Quality: </Paragraph>
						<AirbnbRating
							onFinishRating={(quality) => this.setState({ quality })}
							showRating={false}
							count={5}
							defaultRating={quality}
							size={20}
						/>
					</View>
					<View style={styles.rowContainer}>
						<Paragraph>Cleanliness: </Paragraph>
						<AirbnbRating
							onFinishRating={(cleanliness) => this.setState({ cleanliness })}
							showRating={false}
							count={5}
							defaultRating={cleanliness}
							size={20}
						/>
					</View>

					<TextInput
						style={styles.textInput}
						placeholder='Write your review here'
						autoCapitalize='none'
						multiline
						value={reviewBody}
						onChangeText={(value) => this.onChangeText('reviewBody', value)}
					/>
					<Button
						style={styles.loginButton}
						mode='contained'
						onPress={() => this.profanityFilter()}>
						Submit
					</Button>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	titlePage: {
		marginVertical: 20,
	},
	rowContainer: {
		flexDirection: 'row',
		marginVertical: 10,
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
		marginVertical: 10,
	},
})

export default CreateReviewPage
