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
  Dimensions,
  StatusBar
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


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

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
      <View style={styles.container}>
        <SideMenu
          menu={<Menu navigation={this.props.navigation} />}
          isOpen={this.state.isOpen}
          onChange={(isOpen) => this.updateMenu(isOpen)}
          navigation={this.props.navigation}
        >
          <MyStatusBar backgroundColor="#f2f2f2" barStyle="dark-content" />
          <HeaderApp navigation={this.props.navigation} toggle={this.toggle.bind(this)}/>

          <ListTop navigation={this.props.navigation} />
        </SideMenu>


      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
})