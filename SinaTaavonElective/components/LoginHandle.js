import React, { Component } from 'react';
import { Button } from 'react-native-paper';
import { Alert, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';

class LoginHandle extends Component {
    constructor(props) {
        super(props);
        this.state = { loginStatus: false }
    };


    loginPageHandler = () => {

        this.setState({ loginStatus: true })
    }

    SignupPageHandler = () => {

        this.setState({ loginStatus: false })
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button style={styles.loginButton} compact="true" mode="outlined" onPress={this.SignupPageHandler}>
                        Sign up Page
  </Button>
                    <Button style={styles.loginButton} compact="true" mode="outlined" onPress={this.loginPageHandler}>
                        Login Page
  </Button>
                    <Button style={styles.loginButton} compact="true" mode="outlined" onPress={this.loginPageHandler}>
                        Clear Session
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
        marginHorizontal: 4
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default LoginHandle;