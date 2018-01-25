/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import ListTop from './components/ListTop'

const { width, height } = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const remote = 'https://firebasestorage.googleapis.com/v0/b/blindaccesapp.appspot.com/o/img%2Fbanner%401176x662.png?alt=media&token=fd5d9350-7909-4ece-81c4-8c7ce081cc2d';


export default class App extends Component<{}> {
  render() {

    const resizeMode = 'center';
    return (
      <View style={[{ flex: 1 }, styles.container]} >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width,
            height: height * 0.3,
          }}
        >
          <Image
            style={{
              flex: 1,
            }}
            source={{ uri: remote }}
          />
        </View>
        <ListTop />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
