import React, { Component } from 'react';
import { Button, TextInput, Title, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = { userData: [], isLoading: true }
    };

    logOut = async () => {
        const token = await AsyncStorage.getItem('session_token');
        return fetch(`${global.BASE_URL}/user/logout`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
        })
            .then((response) => {
                if(response.status === 200) {
                    console.log('user gone')
                    AsyncStorage.clear();
                    this.forceUpdate(AccountPage);
                } else {
                    AsyncStorage.clear();
                    this.forceUpdate(AccountPage);
                }
            })
            .catch((error) => {
                console.log(error + "Account page error")
            })


    }

    componentDidMount = async () => {
        const token = await AsyncStorage.getItem('session_token');
        const userId = await AsyncStorage.getItem('user_id');

        if (token && userId === [] || token && userId === undefined || token && userId === null || token && userId === '') {
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
                    console.log(error + "Account page error")
                })
        } else {
            console.log('Need to sign in'); 
        }

    }

    render() {
        const { userData, isLoading } = this.state;
        console.log(userData)
        return (
            <View style={styles.container}>
                {isLoading ? <Title style={styles.titlePage}>{userData.email}</Title> : <ActivityIndicator animating={true} color={'#3366FF'} />}

                <Button style={styles.loginButton} compact="true" mode="outlined" onPress={this.logOut}>
                        Logout
</Button>
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