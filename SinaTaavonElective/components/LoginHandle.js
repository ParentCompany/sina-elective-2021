import React, { Component } from 'react';
import { Button, TextInput, Title, Caption } from 'react-native-paper';
import { Alert, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

class LoginHandle extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', firstname: '', lastname: '', loginStatus: false }
    };

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    loginPageHandler = () => {

        this.setState({ loginStatus: true })
    }

    SignupPageHandler = () => {

        this.setState({ loginStatus: false })
    }

    signUp = async () => {
        const { password, email, firstname, lastname } = this.state

        let payload = { first_name: firstname, last_name: lastname, email: email, password: password }

        return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
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
                <View style={styles.buttonContainer}>
                    <Button style={styles.loginButton} mode="outlined" onPress={this.SignupPageHandler}>
                        Sign up Page
  </Button>
                    <Button style={styles.loginButton} mode="outlined" onPress={this.loginPageHandler}>
                        Login Page
  </Button>
                </View>

                {this.state.loginStatus ? <LoginPage /> : <SignupPage />}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginButton: {
        marginTop: 20,
        marginHorizontal: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default LoginHandle;