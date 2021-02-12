import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import SingleCardView from '../SingleCardView';

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shopData: []
        }
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    statusCodeHandler = (response) => {
        const { navigation } = this.props;
        switch (response.status) {
            case 200:
                return response.json();
            case 201:
                return response.json();
            case 400:
                Alert.alert(`There has been an error in retreving your request. Status code: ${response.status}`);
                break;
            case 401:
                return navigation.navigate('LoginPage');
            case 403:
                Alert.alert(`Please relaunch the application. Status code: ${response.status}`);
                break;
            case 404:
                Alert.alert(`Request has not been found. Status code: ${response.status}`);
                break;
            case 500:
                Alert.alert(`Please relaunch the application or make sure you are connected to the internet. Status code: ${response.status}`);
                break;
            default:
                console.log(`There has been an unknown error. Status code: ${response.status}.`);
        }
    }


    componentDidMount = async () => {
        const { navigation } = this.props;
        const token = await AsyncStorage.getItem('session_token');

        if (token === null || token === undefined || token === '' || token === []) {
            navigation.push('SignupPage');
        } else if (token !== null || token !== undefined || token !== '' || token !== []) {

            this.getData(token);

        } else {
            console.log('Need to sign in');
            AsyncStorage.clear();
            navigation.push('LoginPage');
        }

    }

    getData = async (token) => {

        return fetch(`${global.BASE_URL}/find`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
        })
            .then((response) => this.statusCodeHandler(response))
            .then(async (responseJson) => {
                await this.setStateAsync({ shopData: responseJson });
                    this.setState({ isNotLoading: true });
            })
            .catch((error) => {
                console.log(error + 'Account page error')
                Alert.alert(`There has been an unknown error from the server.`)
            })

    }


    render() {
        const { navigation } = this.props;
        const { shopData } = this.state || {};
        console.log(shopData)

        return (
            <View style={styles.container}>
                <ScrollView>
                {shopData?.map((shop, index) => (
                    <SingleCardView key={index} title={shop.location_name} location={shop.location_town} photo={shop.photo_path} />
                ))}
                
                </ScrollView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titlePage: {
        marginHorizontal: 10,
        marginVertical: 20
    },
    rowContainer: {
        flexDirection: 'row'
    },
    spaceCard: {
        marginVertical: 15,
        marginHorizontal: 10
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
    }
})

export default ReviewPage;