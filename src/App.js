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
import { SearchBar, Header } from 'react-native-elements'
import ListTop from './components/ListTop'
import HeaderApp from './components/HeaderApp'
import SideMenu from 'react-native-side-menu'
import Menu from './components/Menu'

const { width, height } = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  updateMenu(isOpen) {
    this.setState({ isOpen })
  }

  render() {

    const resizeMode = 'center';
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <SideMenu
          menu={<Menu/>}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenu(isOpen)}
        >

          <HeaderApp toggle={this.toggle.bind(this)} />

          <ListTop />
        </SideMenu>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: 'black'
  }
})