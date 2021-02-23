import React, { Component } from 'react'
import { Button, TextInput, Title, Caption } from 'react-native-paper'
import { Alert, View, StyleSheet, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class LoginPage extends Component {
	constructor(props) {
		super(props)
		this.state = { username: '', password: '' }
	}

	statusCodeHandler = (response) => {
		switch (response.status) {
			case 200:
				return response.json()
			case 400:
				ToastAndroid.show(
					'Username or Password is incorrect',
					ToastAndroid.SHORT
				)
				break
			case 500:
				Alert.alert(
					`Please relaunch the application or make sure you are connected to the internet. Status code: ${response.status}`
				)
				break
			default:
				console.log(
					`There has been an unknown error. Status code: ${response.status}.`
				)
		}
	}

	onChangeText = (key, value) => {
		this.setState({ [key]: value })
	}

	logIn = async () => {
		const { navigation } = this.props
		const { password, email } = this.state

		let payload = { email: email, password: password }

		return fetch(`${global.BASE_URL}/user/login`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
			.then((response) => this.statusCodeHandler(response))
			.then(async (responseJson) => {
				console.log(responseJson)
				await AsyncStorage.setItem(
					'session_token',
					String(responseJson.token)
				)
				await AsyncStorage.setItem('user_id', String(responseJson.id))
				ToastAndroid.show(
					'Logged in successfully',
					ToastAndroid.SHORT
				)
				navigation.navigate('AccountPage')
			})
			.catch((error) => {
				console.log(error)
			})
	}

	render() {
		const { navigation } = this.props
		return (
			<View style={styles.container}>
				<Title style={styles.titlePage}>Login</Title>
				<TextInput
					style={styles.textInput}
					placeholder='Email'
					autoCapitalize='none'
					onChangeText={(value) => this.onChangeText('email', value)}
				/>
				<TextInput
					style={styles.textInput}
					placeholder='Password'
					secureTextEntry={true}
					autoCapitalize='none'
					onChangeText={(value) =>
						this.onChangeText('password', value)
					}
				/>
				<Button
					style={styles.loginButton}
					mode='contained'
					onPress={this.logIn}>
					Login
				</Button>
				<Caption style={styles.captionTextOr}>or</Caption>
				<Button
					style={styles.loginButton}
					mode='contained'
					onPress={() => navigation.navigate('SignupPage')}>
					Sign up
				</Button>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	textOr: {
		textAlign: 'center',
	},
	titlePage: {
		margin: 10,
		marginBottom: 20,
	},
	textInput: {
		margin: 10,
	},
	loginButton: {
		margin: 10,
	},
	captionTextOr: {
		margin: 10,
		textAlign: 'center',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
})

export default LoginPage
