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
import _ from "lodash"
import store from './store';
import firebase, { auth } from './firebase';

const { width, height } = Dimensions.get('window');


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const MyStatusBar = ({ backgroundColor, ...props }) => (
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

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {

        store.dispatch({
          type: "SET_AUTH_USER",
          user: user
        });

        const cartRef = `carts/${user.uid}`
        const itemsRef = firebase.database().ref(cartRef);
        itemsRef.on("value", snapshot => {
          let item = snapshot.val();
          if (item) {
            console.log("Existe cart open");
            console.dir(item);
          } else {
            console.log("No existe cart open, se crea uno");

            const newCartKey = itemsRef.push().key;
            console.dir(newCartKey);
            console.log(newCartKey);
            store.dispatch({
              type: "SET_CART_ID",
              cartId: newCartKey
            });
          }

        });

      }
    });
  }

  componentWillMount() {
    const itemsRef = firebase.database().ref("/");
    itemsRef.child("products").on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          name: items[item].name,
          images: items[item].images,
          description: items[item].description,
          price: items[item].price,
          category: items[item].category,
          outstanding: items[item].outstanding,
          thumbnail: items[item].images ? items[item].images[0].original : 'https://firebasestorage.googleapis.com/v0/b/blindaccesapp.appspot.com/o/img%2Flogo-symbol.png?alt=media&token=c01068e4-9b25-4894-b180-cd83770dfdc8'
        });


      }

      newState = _.orderBy(newState, this.state.currentOrder);

      store.dispatch({
        type: "SET_PRODUCT_LIST",
        products: newState
      });

      store.dispatch({
        type: "SET_FILTERED_LIST",
        filteredProducts: newState
      });

      let outstandingProducts = _.filter(newState, item => {
        return item.outstanding == true
      });


      store.dispatch({
        type: "SET_OUTSTANDING_LIST",
        outstandingProducts: outstandingProducts
      })

    });

    this.loadCategories();
  }

  loadCategories() {
    const itemsRef = firebase.database().ref("/");
    itemsRef.child("categories").on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];

      newState.push({
        id: '',
        categoryName: 'Todas'
      });

      for (let item in items) {
        newState.push({
          id: item,
          categoryName: items[item].categoryName
        });
      }

      store.dispatch({
        type: "SET_CATEGORY_ARRAY",
        categoriesArray: newState
      })
      store.dispatch({
        type: "SET_CATEGORY_LIST",
        categories: snapshot.val()
      })
    });
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
          <HeaderApp navigation={this.props.navigation} toggle={this.toggle.bind(this)} />
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