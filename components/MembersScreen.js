import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  AsyncStorage,
  Text
} from 'react-native';
import Dimensions from 'Dimensions';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import arrowImg from '../img/left-arrow.png';
import BalancesScreen from './BalancesScreen';
import PersonalDetailsScreen from './PersonalDetailsScreen';
// import FaBeer from 'react-icons/lib/fa/beer';
//var FaBeer = require('react-icons/lib/fa/beer');
import { FaBeer } from 'react-icons/lib/fa'

const SIZE = 40;

const TabStack = TabNavigator({
  Balances: { screen: BalancesScreen, },
  PersonalDetails: { screen: PersonalDetailsScreen, }
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <View />
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
}
);

export default class MembersScreen extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.onPressBack = this.onPressBack.bind(this);
    this.growAnimated = new Animated.Value(0);
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      AlertIOS.alert("Logout Success!")
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }
  
  async onPressDoSomething() {
    var DEMO_TOKEN = await AsyncStorage.getItem('token'); //STORAGE_KEY
    console.log(DEMO_TOKEN);
    // fetch("http://localhost:3001/api/protected/random-quote", {
    //     method: "GET",
    //     headers: {
    //     'Authorization': 'Bearer ' + DEMO_TOKEN
    //     }
    // })
    // .then((response) => response.text())
    // .then((quote) => {
    //     AlertIOS.alert(
    //     "Chuck Norris Quote:", quote)
    // })
    // .done();
  }

  onPressBack() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      //Actions.pop();
      this.props.navigation.goBack();
    }, 500);
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    return (
      <TabStack />
    // <View style={{
    // flex: 1,
    // width: null,
    // height: null,
    // backgroundColor: '#34495e'
    // }}>
    //   <View style={{padding: 10}}>
    //     <TouchableOpacity 
    //       style={{
    //           backgroundColor: 'white',
    //           borderColor: '#e74c3c',
    //           borderLeftWidth: 2,
    //           marginBottom: 10,
    //           padding: 10,
    //           borderRadius: 10,
    //           width: '50%'
    //       }}>
    //       <Text>Account List</Text>
    //     </TouchableOpacity>
    //     <TouchableOpacity 
    //       style={{
    //           backgroundColor: 'white',
    //           borderColor: '#e74c3c',
    //           borderLeftWidth: 2,
    //           marginBottom: 10,
    //           padding: 10,
    //           borderRadius: 10,
    //           width: '50%'
    //       }}>
    //       <Text>Account Details</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
    );
  }
}

export const Tabs = TabNavigator({
  Member: {
    screen: MembersScreen, // Replaced Feed with FeedStack
    navigationOptions: {
      tabBarLabel: 'Members Area',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    },
  },
});

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZE,
    height: SIZE,
    borderRadius: 100,
    zIndex: 99,
    backgroundColor: '#2980b9', //F035E0
  },
  circle: {
    height: SIZE,
    width: SIZE,
    marginTop: -SIZE,
    borderRadius: 100,
    backgroundColor: '#2980b9', //F035E0
  },
  image: {
    width: 24,
    height: 24,
  },
});
