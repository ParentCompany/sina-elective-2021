/* eslint-disable no-tabs */
import React, { Component } from 'react'
import { Button } from 'react-native-paper'
import { View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SignupPage from './SignupPage'
import LoginPage from './LoginPage'
import AccountPage from './AccountPage'

class LoginHandlePage extends Component {
  constructor (props) {
    super(props)
    this.state = { loginStatus: false, isLoggedin: false }
  }

  loginPageHandler () {
    this.setState({ loginStatus: true })
  };

  SignupPageHandler () {
    this.setState({ loginStatus: false })
  };

  async componentDidMount () {
    const token = await AsyncStorage.getItem('session_token')
    if (token === null || token === undefined || token === '' || token === []) {
      this.setState({ isLoggedin: false })
    } else if (
      token !== null ||
            token !== undefined ||
            token !== '' ||
            token !== []
    ) {
      this.setState({ isLoggedin: true })
    }
  };

  render () {
    const { loginStatus, isLoggedin } = this.state

    if (!isLoggedin) {
      return (
                <ScrollView>
                    <View style={styles.container}>
                        {loginStatus ? <LoginPage /> : <SignupPage />}
                        <View style={styles.buttonContainer}>
                            <Button
                                style={styles.loginButton}
                                compact='true'
                                mode='outlined'
                                onPress={this.SignupPageHandler}>
                                Sign up Page
							</Button>
                            <Button
                                style={styles.loginButton}
                                compact='true'
                                mode='outlined'
                                onPress={this.loginPageHandler}>
                                Login Page
							</Button>
                            <Button
                                style={styles.loginButton}
                                compact='true'
                                mode='outlined'
                                onPress={this.loginPageHandler}>
                                Clear Session
							</Button>
                        </View>
                    </View>
                </ScrollView>
      )
    }
    return (
            <View style={styles.container}>
                <AccountPage />
            </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  loginButton: {
    marginTop: 20,
    marginHorizontal: 4
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignContent: 'center',
    justifyContent: 'center'
  }
})

export default LoginHandlePage
