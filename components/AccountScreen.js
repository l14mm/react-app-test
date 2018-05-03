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

import arrowImg from '../img/left-arrow.png';

const SIZE = 40;

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    console.log(params.index);
    this.state = {
        index: params.index,
        name: params.name,
        sortCode: params.sortCode,
        accountNumber: params.accountNumber,
        balance: params.balance,
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

  onPressBack() {
    if (this.state.isLoading) return;

    this.setState({isLoading: true});

    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 300,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this.props.navigation.goBack();
    }, 500);
  }

  render() {
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SIZE],
    });

    return (
    <View style={{
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '#34495e'
    }}>
        <View style={{
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        }}>
            <Text style={{fontSize: 20, color: 'white'}}>Account name: {this.state.name}</Text>
            <Text style={{fontSize: 20, color: 'white'}}>Sort Code: {this.state.sortCode}</Text>
            <Text style={{fontSize: 20, color: 'white'}}>Account number: {this.state.accountNumber}</Text>
            <Text style={{fontSize: 20, color: 'white'}}>Balance: £{this.state.balance}</Text>
        </View>
        <View style={styles.container}>
            <TouchableOpacity
            onPress={this.onPressBack}
            style={styles.button}
            activeOpacity={1}>
            <Image style={styles.image} source={arrowImg} />
            </TouchableOpacity>
            <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
            />
        </View>
      </View>
    );
  }
}

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
