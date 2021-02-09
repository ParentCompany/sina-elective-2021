import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import SingleCardView from '../SingleCardView';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { loginStatus: false }
    };

    signUp = async () => {
        const { password, email } = this.state

        let payload = { email: email, password: password }

        return fetch(`${global.BASE_URL}/user/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Successful")
                } else if (response.status === 400) {
                    console.log("Invalid validation")
                } else {
                    console.log("Error")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView >
                    <Title style={styles.titlePage}>Explore</Title>
                    <View style={styles.rowContainer}>
                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button onPress={() => {nav.navigate('Coffee')}} mode="text">Open</Button>
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
                    </View>


                    <SingleCardView />


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

export default HomePage;