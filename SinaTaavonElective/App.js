import React, { Component } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import SignupPage from './components/SignupPage';

class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'home', title: 'Home', icon: 'home', color: '#3F51B5' },
        { key: 'shops', title: 'Coffe Shops', icon: 'store', color: '#009688' },
        { key: 'search', title: 'Search', icon: 'magnify', color: '#795548' },
        { key: 'account', title: 'Account', icon: 'account', color: '#607D8B' },
      ]
    }


  };

  HomeRoute = () => <SignupPage />;
  ShopsRoute = () => <Text>Coffe Shops</Text>;
  SearchRoute = () => <Text>Search</Text>;
  AccountRoute = () => <Text>Account</Text>;

  onChange = (e) => {
    this.setState({ index: e });
  }

  renderScene = BottomNavigation.SceneMap({
    home: this.HomeRoute,
    shops: this.ShopsRoute,
    search: this.SearchRoute,
    account: this.AccountRoute,
  });

  render() {
    const { index, routes } = this.state;
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={this.onChange}
        renderScene={this.renderScene}
      />
    );
  }
}

export default HelloWorldApp;