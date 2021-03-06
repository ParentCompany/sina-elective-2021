import React, { Component } from 'react'
import {
	Button,
	Title,
	Paragraph,
	Card,
	ActivityIndicator,
	Divider,
} from 'react-native-paper'
import {
	View,
	StyleSheet,
	ScrollView,
	Alert,
	RefreshControl,
	ToastAndroid,
	Dimensions,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Rating, AirbnbRating } from 'react-native-ratings'

class AccountPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userData: [],
			isNotLoading: false,
			userReviews: { reviews: [] },
			reFetch: 'notUpdated',
			refreshing: false,
		}
	}

	statusCodeHandler = (response) => {
		const { navigation } = this.props
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
				return navigation.navigate('LoginPage')
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

	setStateAsync(state) {
		return new Promise((resolve) => {
			this.setState(state, resolve)
		})
	}

	logOut = async () => {
		const { navigation } = this.props
		const token = await AsyncStorage.getItem('session_token')
		return fetch(`${global.BASE_URL}/user/logout`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
		})
			.then((response) => {
				if (response.status === 200) {
					console.log('user gone')
					this.setState({
						userData: [],
						userReviews: { reviews: [] },
					})
					AsyncStorage.clear()
					navigation.navigate('LoginPage')
				} else {
					this.setState({
						userData: [],
						userReviews: { reviews: [] },
					})
					AsyncStorage.clear()
				}
			})
			.catch((error) => {
				console.log(error + 'Account page error')
			})
	}

	componentDidMount = async () => {
		const { navigation } = this.props
		const { userData } = this.state

		this.ejectComponent = navigation.addListener('focus', () => {
			this.componentDidMount()
		})

		const token = await AsyncStorage.getItem('session_token')

		if (
			token === null ||
			token === undefined ||
			token === '' ||
			token === []
		) {
			navigation.navigate('LoginPage')
		} else if (
			token !== null ||
			token !== undefined ||
			token !== '' ||
			token !== []
		) {
			if (userData?.length === 0 || userData === undefined) {
				this.setState({ isNotLoading: false })
				this.getData(token)
			}
		} else {
			console.log('Need to sign in')
			AsyncStorage.clear()
			navigation.navigate('LoginPage')
		}
	}

	componentWillUnmount() {
		this.ejectComponent()
	}

	getData = async () => {
		const token = await AsyncStorage.getItem('session_token')
		const userId = await AsyncStorage.getItem('user_id')
		return fetch(`${global.BASE_URL}/user/${userId}`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
		})
			.then((response) => this.statusCodeHandler(response))
			.then(async (responseJson) => {
				this.setState({ userData: responseJson })
				this.reviewDetails(token, userId)
				this.setState({ isNotLoading: true })
			})
			.catch((error) => {
				console.log(error + 'Account page error')
				Alert.alert(
					`There has been an unknown error from the server.`
				)
			})
	}

	reviewDetails = async (token, userId) => {
		return fetch(`${global.BASE_URL}/user/${userId}`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Authorization': token,
			},
		})
			.then((response) => response.json())
			.then(async (responseJson) => {
				this.setState({ userReviews: responseJson })
			})
			.catch((error) => {
				console.log(error + 'Account page error')
			})
	}

	_onRefresh = () => {
		this.setState({ refreshing: true })
		this.getData().then(() => {
			this.setState({ refreshing: false })
		})
	}

	removeReview = async (shopId, reviewId) => {
		const { navigation } = this.props

		const token = await AsyncStorage.getItem('session_token')

		return fetch(
			`${global.BASE_URL}/location/${shopId}/review/${reviewId}`,
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
					ToastAndroid.show(
						'Review has been deleted',
						ToastAndroid.SHORT
					)
					this.getData()
				} else if (response.status === 403) {
					Alert.alert(`Forbidden request.`)
				}
			})
			.catch((error) => {
				console.log(error + 'Account page error')
			})
	}

	render() {
		const { userData, isNotLoading, userReviews } = this.state
		const { navigation } = this.props

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
		]

		return (
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					{isNotLoading ? (
						<View>
							<Title style={styles.titlePage}>
								Your account details
							</Title>
							<Card style={styles.spaceCard}>
								<Paragraph style={styles.cardParagraph}>
									First name: {userData?.first_name}
								</Paragraph>
								<Paragraph style={styles.cardParagraph}>
									Last name: {userData?.last_name}
								</Paragraph>
								<Paragraph style={styles.cardParagraph}>
									Email address: {userData?.email}
								</Paragraph>
							</Card>
							<View style={styles.containerRow}>
								<Button
									style={styles.loginButton}
									compact='true'
									mode='contained'
									onPress={() => this.logOut()}>
									Logout
								</Button>
								<Button
									style={styles.loginButton}
									compact='true'
									mode='contained'
									onPress={() =>
										navigation.navigate('AccountDetailsUpdatePage', {
											reFetch: 'notUpdated',
										})
									}>
									Edit
								</Button>
							</View>
							<Divider style={styles.dividerSpace} />
							<Title style={styles.titlePage}>Your reviews</Title>
							{userReviews?.reviews?.map((review, index) => (
								<Card key={index} style={styles.spaceCard}>
									<Paragraph style={styles.cardParagraph}>
										Coffee Shop: {review.location.location_name}
									</Paragraph>
									<View style={styles.rowContainerRating}>
										<Paragraph style={styles.cardParagraph}>
											Overall rating:{' '}
										</Paragraph>
										<AirbnbRating
											showRating={false}
											count={5}
											defaultRating={review.review.overall_rating}
											size={20}
											isDisabled
										/>
									</View>
									<Paragraph style={styles.cardParagraph}>
										Review: {review.review.review_body}
									</Paragraph>
									<View style={styles.containerRowButtons}>
										<Button
											style={styles.cardParagraph}
											icon='comment-edit'
											compact={true}
											mode='contained'
											onPress={() =>
												navigation.navigate('EditReviewPage', {
													shopId: review.location.location_id,
													reviewId: review.review.review_id,
													reviewBody: review.review.review_body,
													reviewOverall: review.review.overall_rating,
													reviewPrice: review.review.price_rating,
													reviewCleanliness:
														review.review.clenliness_rating,
													reviewQuality: review.review.quality_rating,
												})
											}></Button>
										<Button
											style={styles.cardParagraph}
											icon='delete'
											compact={true}
											mode='contained'
											onPress={() =>
												this.removeReview(
													review.location.location_id,
													review.review.review_id
												)
											}></Button>
									</View>
								</Card>
							))}
							<Divider style={styles.dividerSpace} />
							<Title style={styles.titlePage}>
								Your favourite locations
							</Title>
							{userReviews?.favourite_locations?.map(
								(favourite, index) => (
									<Card key={index} style={styles.spaceCard}>
										<Paragraph style={styles.cardParagraph}>
											Coffee Shop Name: {favourite.location_name}
										</Paragraph>
										<Paragraph style={styles.cardParagraph}>
											Coffee Shop Town: {favourite.location_town}
										</Paragraph>
										<View style={styles.rowContainerRating}>
											<Paragraph style={styles.cardParagraph}>
												Overall rating:{' '}
											</Paragraph>
											<Rating
												showRating={false}
												count={5}
												startingValue={favourite.avg_overall_rating}
												readonly={true}
												fractions={2}
												type='star'
												imageSize={20}
											/>
										</View>
										<Card.Actions>
											<Button
												style={{ marginLeft: -10 }}
												mode='contained'
												onPress={() =>
													navigation.navigate('ShopPage', {
														shopId: favourite.location_id,
														coverPhoto: coverPhoto[index].path,
													})
												}>
												Open
											</Button>
										</Card.Actions>
									</Card>
								)
							)}
						</View>
					) : (
						<View style={styles.activityIndicator}>
							<ActivityIndicator animating={true} color={'#3366FF'} />
						</View>
					)}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	titlePage: {
		marginTop: 10,
		marginHorizontal: 10,
	},
	loginButton: {
		margin: 10,
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	containerRow: {
		flexDirection: 'row',
	},
	spaceCard: {
		marginHorizontal: 10,
		marginTop: 10,
		paddingHorizontal: 10,
	},
	dividerSpace: {
		marginTop: 10,
	},
	cardParagraph: {
		marginVertical: 10,
	},
	containerRowButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	activityIndicator: {
		marginTop: Dimensions.get('screen').height / 3,
	},
	rowContainerRating: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
})

export default AccountPage
