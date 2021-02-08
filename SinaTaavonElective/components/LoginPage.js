import React, { Component } from 'react';
import { Button, TextInput, Title, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
    };

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    logIn = async () => {
        const { password, email } = this.state

        let payload = { email: email, password: password }

        return fetch(`${global.BASE_URL}/user/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                console.log(responseJson)
                await AsyncStorage.setItem('session_token', String(responseJson.token));
                await AsyncStorage.setItem('user_id', String(responseJson.id));
              })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        return (

            <View style={styles.container}>
                <Title style={styles.titlePage}>Login</Title>
                <TextInput
                    style={styles.textInput}
                    placeholder='Email'
                    autoCapitalize="none"
                    onChangeText={value => this.onChangeText('email', value)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={value => this.onChangeText('password', value)}
                />
                <Button style={styles.loginButton} mode="contained" onPress={this.logIn}>
                    Login
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

export default LoginPage;