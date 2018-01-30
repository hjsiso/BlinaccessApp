import React, { Component } from 'react'
import App from './App'
import Details from './components/Details'
import Search from './components/Search'
import ShowImage from './components/ShowImage'
import SignIn from './components/SignIn'
import About from './components/About'
import Contact from './components/Contact'
import { StackNavigator } from 'react-navigation'


const IndexApp = StackNavigator({
    Home: {screen: App},
    Details: {screen: Details},
    Search: {screen: Search},
    ShowImage: {screen: ShowImage},
    SignIn: {screen: SignIn},
    About: {screen: About},
    Contact: {screen: Contact},
},{
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
   }
);

export default IndexApp