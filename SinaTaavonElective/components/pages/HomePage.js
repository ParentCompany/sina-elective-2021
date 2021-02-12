import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph, Avatar, IconButton, Colors, ProgressBar, List } from 'react-native-paper';

import SingleCardView from '../SingleCardView';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, locData: {}, expanded: false }
    };

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

    componentDidMount = () => {
            this.getData();
    }

    getData = () => {
        const locId = Math.floor(Math.random() * 5) + 1;
        return fetch(`${global.BASE_URL}/location/${locId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => this.statusCodeHandler(response))
            .then((responseJson) => {
                this.setState({ locData: responseJson })
                this.setState({ isLoading: false })
            })
            .catch((error) => {
                console.log(error + 'Account page error')
                Alert.alert(`There has been an unknown error from the server.`)
            })
    }

    render() {
        const { navigation } = this.props;
        const { locData } = this.state || {};

        return (
            <View style={styles.container}>
                <ScrollView >
                    <View style={styles.titleRow}>
                        <Title style={styles.titlePage}>Random selection</Title>
                        <Button icon="refresh" compact={true} mode="outlined" onPress={() => this.getData()}>
                        </Button>
                    </View>

                    {/* <View style={styles.rowContainer}>
                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button onPress={() => {navigation.navigate('Coffee')}} mode="text">Open</Button>
                            </Card.Actions>
                        </Card>

                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button mode="text">Open</Button>
                            </Card.Actions>
                        </Card>

                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button mode="text">Open</Button>
                            </Card.Actions>
                        </Card>
                    </View> */}
                    <Card>
                        <Card.Title title={locData.location_name} subtitle={locData.location_town} left={(props) => <Avatar.Icon {...props} icon="cup" />} right={(props) => <IconButton {...props} icon="coffee-to-go-outline" color={Colors.purple700} onPress={() => { }} />} />
                        <Card.Cover source={{ uri: 'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260' }} />
                        <Card.Content>
                            <Title style={styles.ratingSpace}>Ratings</Title>
                            <Paragraph style={styles.ratingSpace}>Avg Overall Rating</Paragraph>
                            <ProgressBar progress={locData.avg_overall_rating / 5} color={Colors.purple700} />
                            <Paragraph style={styles.ratingSpace}>Avg Price Rating</Paragraph>
                            <ProgressBar progress={locData.avg_price_rating / 5} color={Colors.purple700} />
                            <Paragraph style={styles.ratingSpace}>Avg Quality Rating</Paragraph>
                            <ProgressBar progress={locData.avg_quality_rating / 5} color={Colors.purple700} />
                            <Paragraph style={styles.ratingSpace}>Avg Cleanliness Rating</Paragraph>
                            <ProgressBar progress={locData.avg_clenliness_rating / 5} color={Colors.purple700} />
                            <Title style={styles.ratingSpace}>Reviews</Title>
                            {locData?.location_reviews?.map((review, index) => (
                                <View key={index} style={styles.reviewRow}>
                                    <Avatar.Icon style={styles.avatarIcon} size={24} icon="face" />
                                    <Paragraph style={{flex: 1, flexWrap: 'wrap'}}>{review.review_body}</Paragraph>
                                    <Button icon="thumb-up" compact={true} disabled={true} mode="text" >
    {review.likes}
  </Button>
                                </View>
                            ))}

                        </Card.Content>


                    </Card>



                    {/* <SingleCardView /> */}


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
        marginHorizontal: 10,
        marginBottom: 15
    },
    ratingSpace: {
        marginVertical: 10
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    reviewRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        alignItems: 'center'
    },
    avatarIcon: {
        marginRight: 15,
    }
})

export default HomePage;