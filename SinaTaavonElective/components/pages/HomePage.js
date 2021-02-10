import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph, Avatar, IconButton } from 'react-native-paper';

import SingleCardView from '../SingleCardView';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { loginStatus: false }
    };



    render() {
        const nav = this.props.navigation;
        return (
            <View style={styles.container}>
                <ScrollView >
                    <Title style={styles.titlePage}>Explore</Title>
                    {/* <View style={styles.rowContainer}>
                        <Card style={styles.rowCard}>
                            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
                            <Card.Actions>
                                <Button onPress={() => {nav.navigate('Coffee')}} mode="text">Open</Button>
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
                    </View> */}
                    <Card>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="cup" />} right={(props) => <IconButton {...props} icon="arrow-right-drop-circle-outline" onPress={() => { }} />} />
                    </Card>
                   


                    {/* <SingleCardView /> */}


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
        marginHorizontal: 10
    }
})

export default HomePage;