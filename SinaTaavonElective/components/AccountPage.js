import React, { Component } from 'react';
import { Button, TextInput, Title, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = { userData: [], isNotLoading: false }
    };

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
                this.setState({ userData: responseJson })
                this.setState({ isNotLoading: true })
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        const { userData, isNotLoading } = this.state;
        console.log(userData)
        return (
            <View style={styles.container}>
                {isNotLoading ? <Title style={styles.titlePage}>{userData.email}</Title> : <ActivityIndicator animating={true} color={'#3366FF'} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textOr: {
        textAlign: 'center'
    },
    titlePage: {
        margin: 10,
        marginBottom: 20
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
    }
})

export default AccountPage;