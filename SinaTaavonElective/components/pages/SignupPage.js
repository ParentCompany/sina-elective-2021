import React, { Component } from 'react';
import { Button, TextInput, Title, Caption } from 'react-native-paper';
import { Alert, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', firstname: '', lastname: '' }
    };

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }


    signUp = async () => {
        const { password, email, firstname, lastname } = this.state

        let payload = { first_name: firstname, last_name: lastname, email: email, password: password }

        return fetch(`${global.BASE_URL}/user`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (response.status === 201) {
                    console.log("Successful")
                    this.autoLogin();
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

    autoLogin = async () => {

        const nav = this.props.navigation;
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
                nav.navigate('AccountPage')
              })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.container}>
                <Title style={styles.titlePage}>Sign up</Title>
                <TextInput
                    style={styles.textInput}
                    placeholder='First name'
                    autoCapitalize="none"
                    onChangeText={value => this.onChangeText('firstname', value)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Last name'
                    autoCapitalize="none"
                    onChangeText={value => this.onChangeText('lastname', value)}
                />
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
                <Caption style={styles.captionText}>Minimum 5 characters </Caption>
                <Button style={styles.signupButton} mode="contained" onPress={this.signUp}>
                    Sign up
  </Button>
  <Caption style={styles.captionTextOr}>or</Caption>
                <Button style={styles.signupButton} mode="contained" onPress={() => nav.navigate('LoginPage')}>
                    Login
  </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titlePage: {
        margin: 10,
        marginBottom: 20
    },
    textInput: {
        margin: 10
    },
    signupButton: {
        margin: 10
    },
    captionText: {
        margin: 10
    },
    captionTextOr: {
        margin: 10,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default SignupPage;