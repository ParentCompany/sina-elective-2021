/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Button, TextInput, Title, Caption } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class LoginPage extends Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '' }
  };

  onChangeText (key, value) {
    this.setState({ [key]: value })
  }

  async logIn () {
    const nav = this.props.navigation
    const { password, email } = this.state

    const payload = { email: email, password: password }

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
        await AsyncStorage.setItem('session_token', String(responseJson.token))
        await AsyncStorage.setItem('user_id', String(responseJson.id))
        nav.navigate('AccountPage')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const nav = this.props.navigation
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
  <Caption style={styles.captionTextOr}>or</Caption>
                <Button style={styles.loginButton} mode="contained" onPress={() => nav.navigate('SignupPage')}>
                    Sign up
  </Button>
            </View>
    )
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
  captionTextOr: {
    margin: 10,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default LoginPage
