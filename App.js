import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View, ScrollView, Image, Text, 
  FlatList, SectionList, ActivityIndicator
} from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }
  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  _onGetName1() {
    fetch('http://localhost/api/name1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.name1 = responseJson.message
        console.log(responseJson)
      })
      .catch((error) =>{
        console.error(error);
      });

    Alert.alert(this.name1)
  }
  _onGetName2() {
    Alert.alert('Liam')
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
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={(item, index) => index}
        /> */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onGetName1}
            title="Get name 1"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onGetName2}
            title="Get name 2"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
   paddingTop: 22
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
