import React, { Component } from 'react'
import {
	Alert,
	View,
	StyleSheet,
	ScrollView,
	RefreshControl,
	ToastAndroid,
} from 'react-native'
import {
	Button,
	Card,
	Title,
	Paragraph,
	Avatar,
	Colors,
	ProgressBar,
} from 'react-native-paper'

class HomePage extends Component {
	constructor(props) {
		super(props)
		this.state = { isLoading: true, locData: {}, refreshing: false }
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

	componentDidMount = () => {
		this.getData()
	}

	getData = () => {
		const locId = Math.floor(Math.random() * 5) + 1
		return fetch(`${global.BASE_URL}/location/${locId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => this.statusCodeHandler(response))
			.then((responseJson) => {
				this.setState({ locData: responseJson })
				this.setState({ isLoading: false })
				ToastAndroid.show(
					'Coffee Shop has been updated',
					ToastAndroid.SHORT
				)
			})
			.catch((error) => {
				console.log(error + 'Account page error')
				Alert.alert(`There has been an unknown error from the server.`)
			})
	}

	_onRefresh = () => {
		this.setState({ refreshing: true })
		this.getData().then(() => {
			this.setState({ refreshing: false })
		})
	}

	render() {
		const { locData } = this.state

		return (
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					<View style={styles.titleRow}>
						<Title style={styles.titlePage}>Random selection</Title>
						<Button
							icon='refresh'
							compact={true}
							mode='outlined'
							onPress={() => this.getData()}></Button>
					</View>
					<Card>
						<Card.Title
							title={locData.location_name}
							subtitle={locData.location_town}
							left={(props) => <Avatar.Icon {...props} icon='cup' />}
						/>
						<Card.Cover
							source={{
								uri:
									'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
							}}
						/>
						<Card.Content>
							<Title style={styles.ratingSpace}>Ratings</Title>
							<Paragraph style={styles.ratingSpace}>
								Avg Overall Rating
							</Paragraph>
							<ProgressBar
								progress={locData.avg_overall_rating / 5}
								color={Colors.purple700}
							/>
							<Paragraph style={styles.ratingSpace}>
								Avg Price Rating
							</Paragraph>
							<ProgressBar
								progress={locData.avg_price_rating / 5}
								color={Colors.purple700}
							/>
							<Paragraph style={styles.ratingSpace}>
								Avg Quality Rating
							</Paragraph>
							<ProgressBar
								progress={locData.avg_quality_rating / 5}
								color={Colors.purple700}
							/>
							<Paragraph style={styles.ratingSpace}>
								Avg Cleanliness Rating
							</Paragraph>
							<ProgressBar
								progress={locData.avg_clenliness_rating / 5}
								color={Colors.purple700}
							/>
							<Title style={styles.ratingSpace}>Reviews</Title>
							{locData?.location_reviews?.map((review, index) => (
								<View key={index} style={styles.reviewRow}>
									<Avatar.Icon
										style={styles.avatarIcon}
										size={24}
										icon='face'
									/>
									<Paragraph style={{ flex: 1, flexWrap: 'wrap' }}>
										{review.review_body}
									</Paragraph>
									<Button
										icon='thumb-up'
										compact={true}
										disabled={true}
										mode='text'>
										{review.likes}
									</Button>
								</View>
							))}
						</Card.Content>
					</Card>
				</ScrollView>
			</View>
		)
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
})

export default HomePage
