import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, ScrollView, Image, Text, 
  FlatList, SectionList, ActivityIndicator, ImageBackground, StatusBar
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { HomeScreen } from './components/HomeScreen.js';
import { ApiScreen } from './components/ApiScreen.js';
import { LoginScreen } from './components/LoginScreen.js'

import MembersScreen from './components/MembersScreen';
import SignUpScreen from './components/SignUpScreen';
import BalancesScreen from './components/BalancesScreen.js';
import AccountScreen from './components/AccountScreen.js';

// const MyApp = DrawerNavigator({
//   Home: {
//     screen: HomeScreen,
//   },
//   Api: {
//     screen: ApiScreen,
//   },
// },
// {
//   drawerPosition: 'left',
//   initialRouteName: 'Home',
//   drawerBackgroundColor: '#f39c12',
//   drawerWidth: 200
// }
// );

const RootStack = StackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    MembersArea: {
      screen: MembersScreen,
    },
    SignUp: {
      screen: SignUpScreen
    },
    Balances: {
      screen: BalancesScreen
    },
    Account: {
      screen: AccountScreen
    }
  },
  {
    //headerMode: 'none',
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2c3e50',
      },
      headerTintColor: '#ecf0f1', //text
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}