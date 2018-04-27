import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, ScrollView, Image, Text, 
  FlatList, SectionList, ActivityIndicator, ImageBackground, StatusBar
} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { HomeScreen } from './HomeScreen.js';
import { ApiScreen } from './ApiScreen.js';

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
    Home: {
      screen: HomeScreen,
    },
    Api: {
      screen: ApiScreen,
    },
  },
  {
    //headerMode: 'none',
    initialRouteName: 'Home',
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