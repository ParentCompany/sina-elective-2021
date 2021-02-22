import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Alert } from 'react-native'
import { TextInput, Title, RadioButton, Colors, Text, Button, Card, Divider } from 'react-native-paper'
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
            offset: 0,
            checked: '',
            shop: []
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

    clearData = () => {
        this.setState({ searchQuery: '', overall: 0, quality: 0, price: 0, cleanliness: 0, checked: '', offset: 0 });
    }

    getData = async () => {
        this.setState({shop: []});
        const {
            searchQuery,
            overall,
            quality,
            cleanliness,
            price,
            checked,
            offset
        } = this.state


        const token = await AsyncStorage.getItem('session_token')

        console.log(offset)

        const data = { 'q': searchQuery, 'overall_rating': overall, 'price_rating': price, 'quality_rating': quality, 'clenliness_rating': cleanliness, 'search_in': checked, 'limit': 1, 'offset': offset  };
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
                await this.setStateAsync({ shop: responseJson })
                
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

    addOffset = () => {
        this.setState({ offset: this.state.offset + 1 }, () => { this.getData() })
    }

    removeOffset = () => {
        this.setState({ offset: this.state.offset - 1 }, () => {  this.getData() }) 
    }

    render() {
        const { navigation } = this.props
        const {
            searchQuery,
            overall,
            quality,
            cleanliness,
            price,
            checked,
            shop,
            offset
        } = this.state

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
                    <View style={styles.reviewRowButton}>
                    <Button
                        style={styles.submitButton}
                        compact={true}
                        mode='contained'
                        onPress={() => this.clearData()}>Clear</Button>
                         <Button
                        style={styles.submitButton}
                        compact={true}
                        mode='contained'
                        onPress={() => this.getData()}>Find</Button>
                        </View>
                        <Divider></Divider>
                        {shop?.map((shop, index) => (
                   
                        <Card key={index} style={styles.spaceCard}>
                        <Card.Title
                            title={shop.location_name}
                            subtitle={shop.location_town}
                        />
                        <Card.Cover source={{ uri: coverPhoto[index + offset].path }} />
                        <Card.Actions>
                            <Button
                                mode='text'
                                compact={true}
                                onPress={() =>
                                    navigation.navigate('ShopPage', {
                                        shopId: shop.location_id,
                                        coverPhoto: coverPhoto[index + offset].path,
                                    })
                                }>
                                Go to the Coffee Shop
								</Button>
                        </Card.Actions>
                    </Card> 
                    ))} 

                </ScrollView>
                <View style={styles.reviewRow}>
                    {shop.length >= 2 ? 
                    <Button
                        icon='arrow-left-bold'
                        compact={true}
                        mode='contained'
                        onPress={() => this.removeOffset()}></Button>
                    : <View></View> }
                    {shop.length !== 0 ?
                    <Button
                        icon='arrow-right-bold'
                        compact={true}
                        mode='contained'
                        onPress={() => this.addOffset()}></Button>
                    : <View></View> }
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
    spaceCard: {
        marginVertical: 15,
        marginHorizontal: 10,
    },
    reviewRowButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
    },
})

export default SearchPage
