/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, { Component } from 'react'
import {
<<<<<<< HEAD
  Button,
  Title,
  Paragraph,
  Card,
  ActivityIndicator,
  Divider
} from 'react-native-paper'
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  ToastAndroid
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
=======
	Button,
	Title,
	Paragraph,
	Card,
	ActivityIndicator,
	Divider,
} from 'react-native-paper';
import {
	View,
	StyleSheet,
	ScrollView,
	Alert,
	RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> parent of 644d3e1 (Delete and Edit Review)

class AccountPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: [],
      isLoading: true,
      userReviews: { reviews: [] },
      reFetch: 'notUpdated',
      refreshing: false
    }
  }

  statusCodeHandler (response) {
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
  };

  setStateAsync (state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  async logOut () {
    const { navigation } = this.props
    const token = await AsyncStorage.getItem('session_token')
    return fetch(`${global.BASE_URL}/user/logout`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log('user gone')
          AsyncStorage.clear()
          navigation.navigate('LoginPage')
        } else {
          AsyncStorage.clear()
        }
      })
      .catch((error) => {
        console.log(error + 'Account page error')
      })
  };

  async componentDidMount () {
    const { navigation } = this.props
    const { userData } = this.state

    this.ejectComponent = navigation.addListener('focus', () => {
      this.componentDidMount()
    })

    const token = await AsyncStorage.getItem('session_token')

    if (token === null || token === undefined || token === '' || token === []) {
      navigation.navigate('LoginPage')
    } else if (
      token !== null ||
			token !== undefined ||
			token !== '' ||
			token !== []
<<<<<<< HEAD
    ) {
      if (userData.length === 0 || userData === undefined) {
        this.getData(token)
      }
    } else {
      console.log('Need to sign in')
      AsyncStorage.clear()
      navigation.navigate('LoginPage')
    }
  };
=======
		) { 
			if(userData.length === 0){
				this.getData(token);
			}
>>>>>>> parent of 644d3e1 (Delete and Edit Review)

  componentWillUnmount () {
    this.ejectComponent()
  }

  async getData () {
    const token = await AsyncStorage.getItem('session_token')
    const userId = await AsyncStorage.getItem('user_id')
    return fetch(`${global.BASE_URL}/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => this.statusCodeHandler(response))
      .then(async (responseJson) => {
        this.setState({ userData: responseJson })
        this.reviewDetails(token, userId)
        this.setState({ isNotLoading: true })
      })
      .catch((error) => {
        console.log(error + 'Account page error')
        Alert.alert('There has been an unknown error from the server.')
      })
  };

  async reviewDetails (token, userId) {
    return fetch(`${global.BASE_URL}/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        this.setState({ userReviews: responseJson })
      })
      .catch((error) => {
        console.log(error + 'Account page error')
      })
  };

  _onRefresh () {
    this.setState({ refreshing: true })
    this.getData().then(() => {
      this.setState({ refreshing: false })
    })
  };

  async removeReview (shopId, reviewId) {
    const token = await AsyncStorage.getItem('session_token')

    return fetch(`${global.BASE_URL}/location/${shopId}/review/${reviewId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
      }
    })
      .then((response) => {
        if (response.status === 200) {
          ToastAndroid.show('Review has been deleted', ToastAndroid.SHORT)
          this.getData()
        } else if (response.status === 403) {
          Alert.alert('Forbidden request.')
        }
      })
      .catch((error) => {
        console.log(error + 'Account page error')
      })
  };

<<<<<<< HEAD
  render () {
    const { userData, isLoading, userReviews } = this.state
    const { navigation } = this.props

    return (
=======
	render() {
		const { userData, isLoading, userReviews, reFetch } = this.state;
		const nav = this.props.navigation;
		const { navigation } = this.props;

		return (
>>>>>>> parent of 644d3e1 (Delete and Edit Review)
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh}
						/>
					}>
					{ isLoading
					  ? (
						<View>
							<Title style={styles.titlePage}>Your account details</Title>
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
									onPress={this.logOut}>
									Logout
								</Button>
								<Button
									style={styles.loginButton}
									compact='true'
									mode='contained'
									onPress={() =>
<<<<<<< HEAD
									  navigation.navigate('AccountDetailsUpdatePage', {
									    reFetch: 'notUpdated'
									  })
=======
										nav.navigate('AccountDetailsUpdatePage', {
											reFetch: 'notUpdated',
										})
>>>>>>> parent of 644d3e1 (Delete and Edit Review)
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
									<Paragraph style={styles.cardParagraph}>
										Overall rating: {review.review.overall_rating}
									</Paragraph>
									<Paragraph style={styles.cardParagraph}>
										Review: {review.review.review_body}
									</Paragraph>
<<<<<<< HEAD
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
									    reviewCleanliness: review.review.clenliness_rating,
									    reviewQuality: review.review.quality_rating
									  })
									}></Button>
									<Button
									style={styles.cardParagraph}
									icon='delete'
									compact={true}
									mode='contained'
									onPress={() => this.removeReview(review.location.location_id, review.review.review_id)}></Button>
									</View>

=======
>>>>>>> parent of 644d3e1 (Delete and Edit Review)
								</Card>
							))}
							<Divider style={styles.dividerSpace} />
							<Title style={styles.titlePage}>Your favourite locations</Title>
							{userReviews?.favourite_locations?.map((favourite, index) => (
								<Card key={index} style={styles.spaceCard}>
									<Paragraph style={styles.cardParagraph}>
										Coffee Shop Name: {favourite.location_name}
									</Paragraph>
									<Paragraph style={styles.cardParagraph}>
										Coffee Shop Town: {favourite.location_town}
									</Paragraph>
								</Card>
							))}
						</View>
					    )
					  : (
						<ActivityIndicator animating={true} color={'#3366FF'} />
					    )}
				</ScrollView>
			</View>
    )
  }
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  textOr: {
    textAlign: 'center'
  },
  titlePage: {
    marginTop: 10,
    marginHorizontal: 10
  },
  textInput: {
    margin: 10
  },
  loginButton: {
    margin: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  containerRow: {
    flexDirection: 'row'
  },
  spaceCard: {
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 10
  },
  dividerSpace: {
    marginTop: 10
  },
  cardParagraph: {
    marginVertical: 10
  },
  containerRowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
=======
	textOr: {
		textAlign: 'center',
	},
	titlePage: {
		marginTop: 10,
		marginHorizontal: 10,
	},
	textInput: {
		margin: 10,
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
});
>>>>>>> parent of 644d3e1 (Delete and Edit Review)

export default AccountPage
