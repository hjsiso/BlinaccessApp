import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import store from "./store";
import { Icon, PricingCard } from 'react-native-elements'

var userProfile = store.getState().userProfile

const Authorization = WrappedComponent => {
  return class WithAuthorization extends React.Component {


    constructor(props) {
      super(props);

      this.state = {
        userProfile: store.getState().userProfile
      };


    }

    componentDidMount() {
      this.unsubscribe = store.subscribe(() => {
        // this.setState({
        //   userProfile: store.getState().userProfile
        // })
        //userProfile: store.getState().userProfile
      })
    }

    componentWillUnmount() {
      console.log("componentWillUnmount");
      this.unsubscribe();
    }

    render() {
      //const { role } = this.state.user
      const { navigate } = this.props.navigation
      //console.log('Authorization');
      //console.dir(this.props);
      if (this.state.userProfile) {
        return <WrappedComponent {...this.props} />;
      } else {
        return (
          <View style={{ flex: 1, marginTop: 0, marginLeft: 0, marginRight: 0, backgroundColor: '#151515' }}>
            <View style={styles.avatarContainer}>
              <Text style={styles.textHeader}>Bienvenido</Text>
            </View>


            <View style={styles.avatarImage}>
              <PricingCard
                color='#fc6800'
                title='Blinaccess'
                onButtonPress={() => navigate('SignIn', { parentUnsubscribe: this.unsubscribe })}
                info={['Esta aplicación', 'es de uso exclusivo', 'de nuestros clientes']}
                button={{ title: 'COMENZAR', icon: 'flight-takeoff' }}
              />
            </View>

          </View>
        );
      }
    }
  };
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 15
  },
  avatarImage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  textHeader: {
    color: '#fc6800',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
    paddingBottom: 0
  },
  textHeader2: {
    color: '#b3b3b3',
    fontSize: 12,
    marginHorizontal: 10,
    paddingBottom: 15
  },
  description: {
    marginVertical: 10,
    marginHorizontal: 20
  },
  text: {
    color: '#b3b3b3',
    fontSize: 14
  },
  text1: {
    color: '#fc6800',
    fontSize: 14,
    fontWeight: '400'
  },
  light: {
    fontWeight: '200'
  }
})

export default Authorization;