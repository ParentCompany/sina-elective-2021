import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { loginStatus: false }
    };


    render() {
        return (
            <View style={styles.container}>
                <ScrollView >
                    <Title style={styles.titlePage}>Explore</Title>
                    <View style={styles.rowContainer}>
                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button mode="text">Open</Button>
                            </Card.Actions>
                        </Card>

                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button mode="text">Open</Button>
                            </Card.Actions>
                        </Card>

                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button mode="text">Open</Button>
                            </Card.Actions>
                        </Card>
                    </View>



                    <Card style={styles.spaceCard}>
                        <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                        <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1586558284960-362f8577f94d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' }} />
                        <Card.Actions>
                            <Button mode="text">Open</Button>
                        </Card.Actions>
                    </Card>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titlePage: {
        marginHorizontal: 10,
        marginVertical: 20
    },
    rowContainer: {
        flexDirection: 'row'
    },
    spaceCard: {
        marginVertical: 15,
        marginHorizontal: 10
    },
    rowCard: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default HomePage;