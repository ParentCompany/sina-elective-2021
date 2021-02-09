import React, { Component } from 'react';
import { Button, TextInput, Title, Paragraph, Card } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Colors } from 'react-native-paper';

class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = { userData: [], isLoading: true }
    };

    logOut = async () => {
        const nav = this.props.navigation;
        const token = await AsyncStorage.getItem('session_token');
        return fetch(`${global.BASE_URL}/user/logout`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('user gone')
                    AsyncStorage.clear();
                    nav.navigate('LoginPage');
                } else {
                    AsyncStorage.clear();
                }
            })
            .catch((error) => {
                console.log(error + "Account page error")
            })


    }

    componentDidMount = async () => {
        const nav = this.props.navigation;
        this._unsubscribe = nav.addListener('focus', () => {
            this.componentDidMount();
        });
        const token = await AsyncStorage.getItem('session_token');
        const userId = await AsyncStorage.getItem('user_id');

        if (token === null || token === undefined || token === '' || token === []) {
            nav.navigate('SignupPage');
        } else if (token !== null || token !== undefined || token !== '' || token !== []) {

            return fetch(`${global.BASE_URL}/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                },
            })
                .then((response) => response.json())
                .then(async (responseJson) => {
                    this.setState({ userData: responseJson })
                    this.setState({ isNotLoading: true })
                })
                .catch((error) => {
                    console.log(error + "Account page error")
                })
        } else {
            console.log('Need to sign in');
            AsyncStorage.clear();
        }

    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        const { userData, isLoading } = this.state;
        return (
            <View style={styles.container}>
                {isLoading ? <View>
                    <Card style={styles.spaceCard}>
                    <Paragraph style={styles.titlePage}>First name: {userData.first_name}</Paragraph>
                    <Paragraph style={styles.titlePage}>Last name: {userData.last_name}</Paragraph>
                    <Paragraph style={styles.titlePage}>Email address: {userData.email}</Paragraph>
                    </Card>
                    
                </View> : <ActivityIndicator animating={true} color={'#3366FF'} />}

                <View style={styles.containerRow}>
                    <Button style={styles.loginButton} compact="true" mode="contained" onPress={this.logOut}>
                        Logout
</Button>
                    <Button style={styles.loginButton} compact="true" mode="contained" onPress={this.logOut}>
                        Edit
</Button>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    textOr: {
        textAlign: 'center'
    },
    titlePage: {
        marginVertical: 10,
        marginHorizontal: 10
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
    },
    containerRow: {
        flexDirection: 'row'
    },
    spaceCard: {
        marginHorizontal: 10
    },
})

export default AccountPage;