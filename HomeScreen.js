import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, ScrollView, Image, Text, 
  FlatList, SectionList, ActivityIndicator, ImageBackground, StatusBar
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./bck.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props){
    super(props);
    this.state = { isLoading: true };
    this._onGetName2 = this._onGetName2.bind(this);
  }
  componentDidMount(){
    this.setState({
      isLoading: false,
      data: [{'key': 'response'}]
    })
  }
  _onGetName1() {
    fetch('http://localhost/api/name1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.name1 = responseJson.message
        console.log(response)
        Alert.alert(this.name1)
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(error)
      });
  }
  _onGetName2() {
    //Alert.alert('Liam')
    //Alert.alert(this.state.data.length.toString())
    this.addToResponseData('new response')
  }
  addToResponseData(key) {
    this.setState({
      isLoading: false,
      data: [{'key': key.toString()}].concat(this.state.data) //(this.state.data.length+1).toString()
    })
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {/* <ImageBackground source={require('./bck.png')}
        style={styles.backgroundImage}
        /> */}
        {/* <StatusBar
          barStyle="light-content" //dark-content
          backgroundColor="#6a51ae"
        /> */}

        <Text style={styles.sectionHeader}>Welcome!</Text>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onGetName1}
            title="Get name 1"
            color="#3498db"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onGetName2}
            title="Get name 2"
            color="#2980b9"
          />
        </View>
        {/* <View style={styles.buttonContainer}>
          <Button
            title="Go to new page"
            onPress={() =>
              navigate('Profile', { name: 'Jane' })
            }
            color="#2980b9"
          />
        </View> */}
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => 
            <View style={styles.listItem}>
              <Text style={styles.listItemIndex}>{index}</Text>
              <Text style={styles.listItemText}>{item.key}</Text>
            </View>
          }
          keyExtractor={(item, index) => 'list-item-${index}'}
          style={styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   paddingTop: 22,
   backgroundColor: '#e74c3c'
  },
  icon: {
    width: 24,
    height: 24,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    margin: 10,
  },
  smallButtonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2
  },
  listItem: {
    padding: 10,
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2c3e50',
    flexDirection: 'row'
  },
  listItemIndex: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  listItemText: {
    fontSize: 18,
    color: '#ecf0f1',
    textAlign: 'center',
    paddingLeft: 50
  },
  sectionHeader: {
    paddingTop: '25%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecf0f1',
    textAlign: 'center'
  }
});