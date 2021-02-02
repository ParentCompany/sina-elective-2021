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

    logIn = async () => {
        const { password, email } = this.state
        try {
            // logic
            console.log('user successfully signed up!: ', success)
        } catch (error) {
            console.log('error signing up: ', error)
        }
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