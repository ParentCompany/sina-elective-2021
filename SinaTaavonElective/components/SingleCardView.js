import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';


class SingleCardView extends Component {
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
        return (
            <View style={styles.container}>
                    <Title style={styles.titlePage}>Explore</Title>
                    <Card style={styles.spaceCard}>
                        <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                        <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1586558284960-362f8577f94d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' }} />
                        <Card.Actions>
                            <Button mode="text">Open</Button>
                        </Card.Actions>
                    </Card>
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

export default SingleCardView;