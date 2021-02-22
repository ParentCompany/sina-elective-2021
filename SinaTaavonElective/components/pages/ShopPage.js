import React, { Component } from 'react'
import {
    Alert,
    View,
    StyleSheet,
    ScrollView,
    Text,
    RefreshControl,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    Button,
    Card,
    Title,
    Paragraph,
    Avatar,
    IconButton,
    Colors,
    ProgressBar,
    Caption,
} from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

class ShopPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopData: {},
            favourite: false,
            userData: {},
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        })
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

    componentDidMount = async () => {
        const { navigation } = this.props
        const { route } = this.props
        const { shopId } = route.params

        const token = await AsyncStorage.getItem('session_token')
        const userId = await AsyncStorage.getItem('user_id')

        if (
            token === null ||
            token === undefined ||
            token === '' ||
            token === []
        ) {
            navigation.push('AccountPage')
        } else if (
            token !== null ||
            token !== undefined ||
            token !== '' ||
            token !== []
        ) {
            this.getData(token, shopId)
            this.getUserInfo(token, userId)
        } else {
            console.log('Need to sign in')
            AsyncStorage.clear()
            navigation.push('AccountPage')
        }
    }

    getData = async (token, shopId) => {
        return fetch(`${global.BASE_URL}/location/${shopId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
        })
            .then((response) => this.statusCodeHandler(response))
            .then(async (responseJson) => {
                await this.setStateAsync({ shopData: responseJson })
                this.setState({ isNotLoading: true })
            })
            .catch((error) => {
                console.log(error + 'Account page error')
                Alert.alert(`There has been an unknown error from the server.`)
            })
    }

    getImageFromServer = async (token, shopId) => {
        return fetch(`${global.BASE_URL}/location/${shopId}/review`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
        })
            .then((response) => this.statusCodeHandler(response))
            .then(async (responseJson) => {
                await this.setStateAsync({ shopData: responseJson })
                this.setState({ isNotLoading: true })
            })
            .catch((error) => {
                console.log(error + 'Account page error')
                Alert.alert(`There has been an unknown error from the server.`)
            })
    }

    getUserInfo = async (token, userId) => {
        console.log(token)

        return fetch(`${global.BASE_URL}/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
        })
            .then((response) => this.statusCodeHandler(response))
            .then(async (responseJson) => {
                await this.setStateAsync({ userData: responseJson })
                this.setState({ isNotLoading: true })
                this.checkForFavourite()
            })
            .catch((error) => {
                console.log(error + 'Account page error')
                Alert.alert(`There has been an unknown error from the server.`)
            })
    }

    checkForFavourite = async () => {
        const { userData } = this.state
        const { route } = this.props
        const { shopId } = route.params

        for (let i = 0; i < userData.favourite_locations.length; i++) {
            if (userData?.favourite_locations[i].location_id === shopId) {
                this.setState({ favourite: true })
            } else {
                console.log(this.state.favourite)
            }
        }
    }

    setFavourite = async () => {
        const { route } = this.props
        const { shopId } = route.params
        const { favourite } = this.state

        const token = await AsyncStorage.getItem('session_token')
        const userId = await AsyncStorage.getItem('user_id')

        if (favourite === true) {
            return fetch(`${global.BASE_URL}/location/${shopId}/favourite`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ favourite: false })
                        this.getUserInfo(token, userId)
                    } else {
                        Alert.alert(`There has been an unknown error from the server.`)
                    }
                })
                .catch((error) => {
                    console.log(error + 'Account page error')
                    Alert.alert(`There has been an unknown error from the server.`)
                })
        } else if (favourite === false) {
            return fetch(`${global.BASE_URL}/location/${shopId}/favourite`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ favourite: true })
                        this.getUserInfo(token, userId)
                    } else {
                        Alert.alert(`There has been an unknown error from the server.`)
                    }
                })
                .catch((error) => {
                    console.log(error + 'Account page error')
                    Alert.alert(`There has been an unknown error from the server.`)
                })
        } else {
            console.log('errrrrrrooooooorrrr')
        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true })
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false })
        })
    }

    render() {
        const { navigation } = this.props
        const { shopData, favourite } = this.state
        const { route } = this.props
        const { coverPhoto, shopId } = route.params

        return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }>
                    <Button
                        style={styles.ratingSpace}
                        icon='pencil'
                        mode='contained'
                        onPress={() =>
                            navigation.navigate('CreateReviewPage', { shopId: shopId })
                        }>
                        Add Review
					</Button>
                    <Card style={styles.ratingSpace}>
                        <Card.Title
                            title={shopData.location_name}
                            subtitle={shopData.location_town}
                            left={(props) => <Avatar.Icon {...props} icon='cup' />}
                            right={(props) => (
                                <IconButton
                                    {...props}
                                    icon={favourite ? 'heart' : 'heart-outline'}
                                    color={Colors.purple700}
                                    onPress={() => {
                                        this.setFavourite()
                                    }}
                                />
                            )}
                        />
                        <Card.Cover source={{ uri: coverPhoto }} />
                        <Card.Content>
                            <Title style={styles.ratingSpace}>Ratings</Title>
                            <Paragraph style={styles.ratingSpace}>
                                Avg Overall Rating
							</Paragraph>
                            <ProgressBar
                                progress={shopData.avg_overall_rating / 5}
                                color={Colors.purple700}
                            />
                            <Paragraph style={styles.ratingSpace}>
                                Avg Price Rating
							</Paragraph>
                            <ProgressBar
                                progress={shopData.avg_price_rating / 5}
                                color={Colors.purple700}
                            />
                            <Paragraph style={styles.ratingSpace}>
                                Avg Quality Rating
							</Paragraph>
                            <ProgressBar
                                progress={shopData.avg_quality_rating / 5}
                                color={Colors.purple700}
                            />
                            <Paragraph style={styles.ratingSpace}>
                                Avg Cleanliness Rating
							</Paragraph>
                            <ProgressBar
                                progress={shopData.avg_clenliness_rating / 5}
                                color={Colors.purple700}
                            />
                            <Title style={styles.ratingSpace}>Reviews</Title>
                            <Caption>
                                Click on each review if you wish to like or unlike them.
							</Caption>
                            {shopData?.location_reviews?.map((review, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.reviewRow}
                                    onPress={() =>
                                        navigation.navigate('ReviewPageLikes', {
                                            reviewId: review.review_id,
                                            reviewLikes: review.likes,
                                            reviewBody: review.review_body,
                                            shopId: shopId,
                                        })
                                    }>
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
                                </TouchableOpacity>
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

export default ShopPage
