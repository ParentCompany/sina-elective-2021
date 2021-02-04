import React, { Component } from 'react';
import { Button, TextInput, Title, Paragraph } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
    };

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

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