import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Searchbar } from 'react-native-paper'

class SearchPage extends Component {
  constructor (props) {
    super(props)
    this.state = { searchQuery: '' }
  };

  onChangeSearch (searchQuery) {
    this.setState({ searchQuery: searchQuery })
  }

  render () {
    const { searchQuery } = this.state
    return (
            <View style={styles.container}>
                <ScrollView >
                    <Searchbar
                        placeholder="Search"
                        onChangeText={this.onChangeSearch}
                        value={searchQuery}
                    />
                </ScrollView>
            </View>
    )
  }
}

const styles = StyleSheet.create({
  spaceCard: {
    marginVertical: 15
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 10
  }
})

export default SearchPage
