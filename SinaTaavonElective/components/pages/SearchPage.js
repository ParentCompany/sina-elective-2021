import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Alert } from 'react-native'
import { TextInput, Title, RadioButton, Colors, Text, Button } from 'react-native-paper'
import { AirbnbRating } from 'react-native-ratings'
import AsyncStorage from '@react-native-async-storage/async-storage'

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: '',
            overall: 0,
            quality: 0,
            price: 0,
            cleanliness: 0,
            checked: '',
            shopData: []
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        })
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


    getData = async () => {
        const {
            searchQuery,
            overall,
            quality,
            cleanliness,
            price,
            reviewBody,
            checked
        } = this.state

        const token = await AsyncStorage.getItem('session_token')

        const data = { 'q': searchQuery, 'overall_rating': overall, 'price_rating': price, 'quality_rating': quality, 'clenliness_rating': cleanliness, 'search_in': checked };
        const querystring = this.cleanObject(data);

        console.log(querystring)

        return fetch(`${global.BASE_URL}/find?${querystring}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token,
            },
        })
            .then((response) => this.statusCodeHandler(response))
            .then(async (responseJson) => {
                await this.setStateAsync({ shopData: responseJson })
                console.log(responseJson)
            })
            .catch((error) => {
                console.log(error + 'Account page error')
                Alert.alert(`There has been an unknown error from the server.`)
            })
    }

    queryMaker = (data) => {
        const query = [];
        for (let d in data)
        query.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return query.join('&');
    }

    cleanObject = (object) => {
		for (var propName in object) {
			if (
				object[propName] === null ||
				object[propName] === undefined ||
				object[propName] === '' ||
                object[propName] === 0
			) {
				delete object[propName]
			}
		}
		return this.queryMaker(object)
	}

    onChangeSearch = (searchQuery) => {
        this.setState({ searchQuery: searchQuery })
    }

    render() {
        const {
            searchQuery,
            overall,
            quality,
            cleanliness,
            price,
            reviewBody,
            checked
        } = this.state
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput
                        placeholder='Search term'
                        onChangeText={this.onChangeSearch}
                        value={searchQuery}
                        mode='outlined'
                        dense={true}
                    />
                    <View style={styles.reviewRow}>
                        <Title>Overall: </Title>
                        <AirbnbRating
                            onFinishRating={(overall) => this.setState({ overall })}
                            showRating={false}
                            count={5}
                            defaultRating={overall}
                            size={20}
                        />
                    </View>
                    <View style={styles.reviewRow}>
                        <Title>Quality: </Title>
                        <AirbnbRating
                            onFinishRating={(quality) => this.setState({ quality })}
                            showRating={false}
                            count={5}
                            defaultRating={quality}
                            size={20}
                        />
                    </View>
                    <View style={styles.reviewRow}>

                        <Title>Price: </Title>
                        <AirbnbRating
                            onFinishRating={(price) => this.setState({ price })}
                            showRating={false}
                            count={5}
                            defaultRating={price}
                            size={20}
                        />
                    </View>
                    <View style={styles.reviewRow}>
                        <Title>Cleanliness: </Title>
                        <AirbnbRating
                            onFinishRating={(cleanliness) => this.setState({ cleanliness })}
                            showRating={false}
                            count={5}
                            defaultRating={cleanliness}
                            size={20}
                        />
                    </View>
                    <View style={styles.reviewRow}>
                        <Title>List: </Title>
                        <Text>Reviewed</Text>
                        <RadioButton
                            value="reviewed"
                            color={Colors.purple500}
                            status={checked === 'reviewed' ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({ checked: 'reviewed' })}
                        />
                        <Text>Favourite</Text>
                        <RadioButton
                            value="favourite"
                            color={Colors.purple700}
                            status={checked === 'favourite' ? 'checked' : 'unchecked'}
                            onPress={() => this.setState({ checked: 'favourite' })}
                        />
                    </View>
                    <Button
                        style={styles.submitButton}
                        compact={true}
                        mode='contained'
                        onPress={() => this.getData()}>Find</Button>
                </ScrollView>
                <View style={styles.reviewRow}>
                    <Button
                        icon='arrow-left-bold'
                        compact={true}
                        mode='contained'
                        onPress={() => this.addLike()}></Button>
                    <Button
                        icon='arrow-right-bold'
                        compact={true}
                        mode='contained'
                        onPress={() => this.removeLike()}></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spaceCard: {
        marginVertical: 15,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 10,
    },
    submitButton: {
        marginVertical: 10
    },
    reviewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
    },
})

export default SearchPage
