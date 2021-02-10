import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

class ReviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {
                reviews: []
            }
        }
    };

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('session_token');
        const userId = await AsyncStorage.getItem('user_id');

        return fetch(`${global.BASE_URL}/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                await this.setStateAsync({ userData: responseJson });
            })
            .catch((error) => {
                console.log(error + "Account page error")
            })
    }


    render() {
        const nav = this.props.navigation;
        const { userData } = this.state || {};
        console.log(userData)


        return (
            <View style={styles.container}>
                {/* <ScrollView > */}
                {/* </ScrollView> */}
                {userData?.reviews?.map((review, index) => (
                    <Text key={index}>
                        {review.review.review_id}
                    </Text>
                ))}
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