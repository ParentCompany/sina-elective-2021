import React, { Component } from 'react';
import { Alert, View, StyleSheet, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Card, Title, Paragraph } from 'react-native-paper';


class CoffeeShopsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { loginStatus: false }
  };


  render() {
    return (
      <View style={styles.container}>
        <ScrollView >
          <Title style={styles.titlePage}>Closest to you</Title>
          <Card style={styles.spaceCard}>
            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
            <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1586558284960-362f8577f94d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' }} />
            <Card.Actions>
              <Button mode="text">Open</Button>
            </Card.Actions>
          </Card>

          <Card style={styles.spaceCard}>
            <Card.Title title="Coffee for Nerds" subtitle="Small friendly coffee shop with high speed internet" />
            <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1586558284960-362f8577f94d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' }} />
            <Card.Actions>
              <Button mode="text">Open</Button>
            </Card.Actions>
          </Card>

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
    marginVertical: 10
  },
  spaceCard: {
    marginVertical: 10
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
})

export default CoffeeShopsPage;