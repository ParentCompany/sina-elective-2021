import React, { Component } from 'react';
import { Button, TextInput, Title, Caption } from 'react-native-paper';
import { Alert, View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ceil } from 'react-native-reanimated';

class AccountDetailsUpdatePage extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', firstname: '', lastname: '', reFetch: 'notUpdated' }
    };

    onChangeText = (key, value) => {
        this.setState({ [key]: value })
    }

    cleanObject = (object) => {
        for (var propName in object) {
            if (object[propName] === null || object[propName] === undefined || object[propName] === '') {
                delete object[propName];
            }
        }
        return object
    }


    UpdateDetails = async () => {
        const { navigation } = this.props;
        const token = await AsyncStorage.getItem('session_token');
        const userId = await AsyncStorage.getItem('user_id');
        const { password, email, firstname, lastname } = this.state

        let payload = { first_name: firstname, last_name: lastname, email: email, password: password }

        const cleanPayload = this.cleanObject(payload)

        return fetch(`${global.BASE_URL}/user/${userId}`, {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(cleanPayload)
        })
            .then((response) => {
                if (response.status === 200) {
                    navigation.push('AccountPage', {reFetch: 'updated'});
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
                <Title style={styles.titlePage}>Update your details</Title>
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
                <Button style={styles.signupButton} mode="contained" onPress={this.UpdateDetails}>
                    Update
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

export default AccountDetailsUpdatePage;