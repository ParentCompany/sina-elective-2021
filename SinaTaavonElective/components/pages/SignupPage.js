import React, { Component } from 'react';
import { Button, TextInput, Title, Caption } from 'react-native-paper';
import { Alert, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', firstname: '', lastname: '' }
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
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default SignupPage;