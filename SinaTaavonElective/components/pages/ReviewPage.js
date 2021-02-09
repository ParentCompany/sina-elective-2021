import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import { FlatList } from 'react-native-gesture-handler';

import SingleCardView from '../SingleCardView';



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

        const test = { "user_id": 8, "first_name": "Sina", "last_name": "Taavon", "email": "sina.taavon@stu.mmu.ac.uk", "favourite_locations": [], "reviews": [{ "review": { "review_id": 7, "overall_rating": 5, "price_rating": 4, "quality_rating": 2, "clenliness_rating": 4, "review_body": "Dont get this too serious", "likes": 0 }, "location": { "location_id": 1, "location_name": "Just Coffee", "location_town": "London", "latitude": 80, "longitude": 0, "photo_path": "http://cdn.dummyphoto.com", "avg_overall_rating": 4, "avg_price_rating": 4, "avg_quality_rating": 2.6667, "avg_clenliness_rating": 3.6667 } }, { "review": { "review_id": 8, "overall_rating": 2, "price_rating": 5, "quality_rating": 4, "clenliness_rating": 1, "review_body": "Dont get this too serious idk", "likes": 0 }, "location": { "location_id": 2, "location_name": "Coffee", "location_town": "Manchester", "latitude": 80, "longitude": 0, "photo_path": "http://cdn.dummyphoto.com", "avg_overall_rating": 3, "avg_price_rating": 5, "avg_quality_rating": 3.5, "avg_clenliness_rating": 2.5 } }], "liked_reviews": [] }

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