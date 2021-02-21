/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-paper'

class SingleCardView extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  };

  render () {
    const { navigation } = this.props
    const { data } = this.props
    return (
            <View style={styles.container}>
                <Card style={styles.spaceCard}>
                    <Card.Title title={data.location_name} subtitle={data.location_town} />
                    <Card.Cover source={{ uri: 'https://images.unsplash.com/photo-1586558284960-362f8577f94d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80' }} />
                    <Card.Actions>
                        <Button mode="text" compact={true} onPress={() => navigation.navigate('ShopPage', { data: data })}>Go to the Coffee Shop</Button>
                    </Card.Actions>
                </Card>
            </View>
    )
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
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default SingleCardView
