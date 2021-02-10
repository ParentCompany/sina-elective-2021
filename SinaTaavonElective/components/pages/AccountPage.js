import React, { Component } from 'react';
import { Button, TextInput, Title, Paragraph, Card, ActivityIndicator, Colors, Divider, Avatar, Badge } from 'react-native-paper';
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = { userData: [], isLoading: true, userReviews: { reviews: [] } }
    };

    logOut = async () => {
        const nav = this.props.navigation;
        const token = await AsyncStorage.getItem('session_token');
        return fetch(`${global.BASE_URL}/user/logout`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('user gone')
                    AsyncStorage.clear();
                    nav.navigate('LoginPage');
                } else {
                    AsyncStorage.clear();
                }
            })
            .catch((error) => {
                console.log(error + "Account page error")
            })
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    componentDidMount = async () => {
        const nav = this.props.navigation;
        this._unsubscribe = nav.addListener('focus', () => {
            this.componentDidMount();
        });
        const token = await AsyncStorage.getItem('session_token');
        const userId = await AsyncStorage.getItem('user_id');

        if (token === null || token === undefined || token === '' || token === []) {
            nav.navigate('SignupPage');
        } else if (token !== null || token !== undefined || token !== '' || token !== []) {

            return fetch(`${global.BASE_URL}/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
            })
                .then((response) => response.json())
                .then(async (responseJson) => {
                    this.setState({ userData: responseJson })
                    this.setState({ isNotLoading: true })
                    this.reviewDetails(token, userId)

                })
                .catch((error) => {
                    console.log(error + 'Account page error')
                })
        } else {
            console.log('Need to sign in');
            AsyncStorage.clear();
        }

    }

    reviewDetails = async (token, userId) => {

        return fetch(`${global.BASE_URL}/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                await this.setStateAsync({ userReviews: responseJson });
            })
            .catch((error) => {
                console.log(error + "Account page error")
            })

    }

    componentWillUnmount = () => {
        this._unsubscribe();
    }

    render() {
        const { userData, isLoading, userReviews } = this.state;
        const nav = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView >
                    {isLoading ?
                        <View>
                            <Title style={styles.titlePage}>Your account details</Title>
                            <Card style={styles.spaceCard}>
                                <Paragraph style={styles.cardParagraph}>First name: {userData.first_name}</Paragraph>
                                <Paragraph style={styles.cardParagraph}>Last name: {userData.last_name}</Paragraph>
                                <Paragraph style={styles.cardParagraph}>Email address: {userData.email}</Paragraph>
                            </Card>
                            <View style={styles.containerRow}>
                        <Button style={styles.loginButton} compact='true' mode="contained" onPress={this.logOut}>
                            Logout
</Button>
                        <Button style={styles.loginButton} compact='true' mode="contained" onPress={() => nav.navigate('AccountDetailsUpdatePage')}>
                            Edit
</Button>
                    </View>
                            <Divider style={styles.dividerSpace} />
                            <Title style={styles.titlePage}>Your reviews</Title>
                            {userReviews?.reviews?.map((review, index) => (
                                <Card key={index} style={styles.spaceCard}>
                                    <Paragraph style={styles.cardParagraph}>Coffee Shop: {review.location.location_name}</Paragraph>
                                   <Paragraph style={styles.cardParagraph}>Overall rating: {review.review.overall_rating}</Paragraph>
                                    <Paragraph style={styles.cardParagraph}>Review: {review.review.review_body}</Paragraph>
                                    <Card.Actions>
                                        <Button mode="text">Open</Button>
                                    </Card.Actions>
                                </Card>
                            ))}
                            
                            

                        </View> :

                        <ActivityIndicator animating={true} color={'#3366FF'} />}

                    

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        justifyContent: 'center',
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
        marginVertical: 10
    },
    cardParagraph: {
        marginVertical: 10
    }

})

export default AccountPage;